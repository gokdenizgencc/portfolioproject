import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responsModel';
import { UserAllInfo } from '../models/userAllInfo';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserInfo } from 'os';
import { UserSearchResultDto } from '../models/UserSearchResultDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userAllInfo: UserAllInfo | null = null;
    private userSearchResultDto: UserSearchResultDto | null = null;
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
  getAllUserİnformartionByNickName(name:string):Observable<SingleResponseModel<UserAllInfo>>{ 
    let path="http://localhost:46772/api/Users/getAllInfoByName?name="+name;

    return this.httpClient.get<SingleResponseModel<UserAllInfo>>(path);
  }
  getAllUserİnformartionOther(id:number):Observable<SingleResponseModel<UserAllInfo>>{
    let path="http://localhost:46772/api/Users/getAllInfoOther?id="+id;

    return this.httpClient.get<SingleResponseModel<UserAllInfo>>(path);
  }
  getUser():Observable<SingleResponseModel<User>>{
    let path="http://localhost:46772/api/Users/getById"
    return this.httpClient.get<SingleResponseModel<User>>(path);
  }
  getUserOwnprofile(usenrame:string):Observable<ResponseModel>{ 
    let path="http://localhost:46772/api/Users/isOwnProfile/"+usenrame;
    return this.httpClient.get<ResponseModel>(path);
  }
    setUserAllInfoData(userAllInfo: UserAllInfo): void {
      this.userAllInfo=userAllInfo
    }
    setUserAllInfoDataOther(userSearchResultDto: UserSearchResultDto): void {
      this.userSearchResultDto=userSearchResultDto
    }
    getUserAllInfoDataOther(): UserSearchResultDto | null {
      return this.userSearchResultDto;
    }
    getUserAllInfoData(): UserAllInfo | null {
      return this.userAllInfo;
    }

}
