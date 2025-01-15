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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="http://localhost:46772/api/auth/";

  constructor(private httpClient:HttpClient,@Inject(DOCUMENT) private document: Document,private toastrService:ToastrService,  private router:Router) {
    const localStorage = document.defaultView?.localStorage;
   }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
   
  }
  decodejwt(){
    const token=localStorage.getItem('token')!;
    const decoded:any  = jwtDecode(token);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const nameIdentifier = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    const name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    localStorage.setItem('role', role || 'defaultRole');
    localStorage.setItem('nameIdentifier', nameIdentifier || 'defaultNameIdentifier');
    localStorage.setItem('name', name || 'defaultName');
    return decoded;
  }
  
  isAuthenticated() {
    if (typeof window !== 'undefined' && localStorage) { // Tarayıcıda çalıştığını kontrol et
      const result = localStorage.getItem("token");
      return !!result; // `result` varsa true, yoksa false döner
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
