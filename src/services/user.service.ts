import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responsModel';
import { UserAllInfo } from '../models/userAllInfo';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userAllInfo: UserAllInfo | null = null;
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
  getAllUserİnformartion():Observable<SingleResponseModel<UserAllInfo>>{
    let path="http://localhost:46772/api/Users/getAllInfo"

    return this.httpClient.get<SingleResponseModel<UserAllInfo>>(path);
  }
  getUser():Observable<SingleResponseModel<User>>{
    let path="http://localhost:46772/api/Users/getById"
    return this.httpClient.get<SingleResponseModel<User>>(path);
  }
    setUserAllInfoData(userAllInfo: UserAllInfo): void {
      this.userAllInfo=userAllInfo
    }
    getUserAllInfoData(): UserAllInfo | null {
      return this.userAllInfo;
    }

}
