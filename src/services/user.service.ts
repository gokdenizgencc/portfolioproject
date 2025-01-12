import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responsModel';
import { UserAllInfo } from '../models/userAllInfo';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="http://localhost:46772/api/";
  constructor(private httpClient:HttpClient) { }
  getUsers():Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"Users/getall"
    return this.httpClient.
      get<ListResponseModel<User>>(newPath);
  }
  getUsersByCategory(categoryId:number):Observable<ListResponseModel<User>>{
        let newPath="http://localhost:46772/api/Users/getbyproject?getbyproject="+categoryId
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  getAllUserİnformartion(id:number):Observable<SingleResponseModel<UserAllInfo>>{
    let path="http://localhost:46772/api/Users/getAllInfo?id="+id

    return this.httpClient.get<SingleResponseModel<UserAllInfo>>(path);
  }
  getUser(id:number):Observable<SingleResponseModel<User>>{
    let path="http://localhost:46772/api/Users/getById?id="+id
    return this.httpClient.get<SingleResponseModel<User>>(path);
  }

}
