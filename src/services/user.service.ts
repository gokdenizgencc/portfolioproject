import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseModel } from '../models/productResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44359/api/Users/getAll";
  constructor(private httpClient:HttpClient) { }
  getUsers():Observable<UserResponseModel>{
    return this.httpClient.
      get<UserResponseModel>(this.apiUrl);
  }
}
