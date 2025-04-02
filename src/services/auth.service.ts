import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responsModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { RegisterModel } from '../models/registerModel';
import { UserAllInfo } from '../models/userAllInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="http://localhost:46772/api/auth/";
  id:number;
  user:string;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(private httpClient:HttpClient,@Inject(DOCUMENT) private document: Document,private toastrService:ToastrService,  private router:Router) {
    const localStorage = document.defaultView?.localStorage;
   }

   login(loginModel: LoginModel): Observable<SingleResponseModel<UserAllInfo>> {
    return this.httpClient.post<SingleResponseModel<UserAllInfo>>(
      this.apiUrl + "login", 
      loginModel, 
      { withCredentials: true }
    ).pipe(
      tap(response => {
        this.isLoggedInSubject.next(true);  
      })
    );
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }
  logout(): Observable<boolean> {
    return this.httpClient.post<{ success: boolean }>(this.apiUrl + 'logout', {}, { withCredentials: true })
      .pipe(
        map(response => {
          if (response.success) {
            this.isLoggedInSubject.next(false); 
            localStorage.clear();
            return true;
          }
          return false;
        })
      );
  }
  decodejwt(){
    const token=localStorage.getItem('token')!;
    const decoded:any  = jwtDecode(token);
    const nameIdentifier = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.id = nameIdentifier !== null ? parseInt(nameIdentifier, 10) : 0;
    return this.id;
  }
  decodejwtusername(){
    const token=localStorage.getItem('token')!;
    const decoded:any  = jwtDecode(token);
    const username = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.user = username !== null ? username : 0;
    return this.user;
  }
  getIntFromLocalStorage(key: string, defaultValue: number = 0): string |null {
    if (typeof window !== 'undefined' && localStorage) { // Tarayıcıda çalıştığını kontrol et
      const value = localStorage.getItem(key) ?? defaultValue.toString();
      return value; // `result` varsa true, yoksa false döner
    } 
    else{
      return null;
    }
  }
  isAuthenticated() {
    if (typeof window !== 'undefined' && localStorage) { 
      const result = localStorage.getItem("token");
      return !!result; 
    } else {
      return false;
    }
  }
  checklogin() {
    this.isAuthenticate().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['homepage']);
        } else {

   

        }
      })
    );
  }
  isAuthenticate(): Observable<boolean> {
    return this.httpClient.get<ResponseModel>(`${this.apiUrl}isAuthenticated`, { withCredentials: true })
      .pipe(
        tap(response => console.log('Auth response:', response)), // Log the response
        map(response => {
          this.isLoggedInSubject.next(response.success);
          return response.success;
        }),
        catchError(error => {
          console.error('Auth error:', error); // Log the error
          this.isLoggedInSubject.next(false);
          return of(false);
        })
      );
  }
  isLogin(): Observable<boolean> {
    return this.isLoggedIn$;
  }

}
