import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseModel } from '../models/productResponseModel';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ListResponseModel } from '../models/ListResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44359/api/";
  constructor(private httpClient:HttpClient) { }
  getUsers():Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"Users/getall"
    return this.httpClient.
      get<ListResponseModel<User>>(newPath);
  }
  getUsersByCategory(categoryId:number):Observable<ListResponseModel<User>>{
        let newPath="https://localhost:44359/api/Users/getbyproject?getbyproject="+categoryId
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

}
