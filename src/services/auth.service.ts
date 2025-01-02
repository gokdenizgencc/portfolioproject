import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responsModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="http://localhost:46772/api/auth/";

  constructor(private httpClient:HttpClient,@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
   }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
   
  }

  isAuthenticated(){
    if(localStorage){

   
    var result=localStorage.getItem("token");
    if(result){
      return true;
    }
    else{
      return false; 
    }
  }
else{
  return false;
}
}
}
