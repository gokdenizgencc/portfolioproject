import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responsModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { RegisterModel } from '../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="http://localhost:46772/api/auth/";
  id:number;
  constructor(private httpClient:HttpClient,@Inject(DOCUMENT) private document: Document,private toastrService:ToastrService,  private router:Router) {
    const localStorage = document.defaultView?.localStorage;
   }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
   
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }
  decodejwt(){
    const token=localStorage.getItem('token')!;
    const decoded:any  = jwtDecode(token);
    const nameIdentifier = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.id = nameIdentifier !== null ? parseInt(nameIdentifier, 10) : 0;
    return this.id;
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
  if (this.isAuthenticated()) {
    this.router.navigate(['homepage']);
  } else {

  }
}
}
