import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfoApplicantDto } from '../models/userInfoApplicantDto';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responsModel';
import { UserInfoPersonalDto } from '../models/userInfoPersonalDto';
import { UserInfoAboutDto } from '../models/userInfoAboutDto';
import { UserInfo } from 'os';
import { UserInfos } from '../models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  private userInfoApplientDto:UserInfoApplicantDto;
  apiUrl="http://localhost:46772/api/";
  constructor(private httpClient:HttpClient) { }

      UpdateUserInfoApplicant(userInfoApplientDto:UserInfoApplicantDto):Observable<SingleResponseModel<UserInfoApplicantDto>>{
             let path=this.apiUrl+"UserInfo/UpdateUserInfoApplicant";
             return this.httpClient.post<SingleResponseModel<UserInfoApplicantDto>>(path,userInfoApplientDto);
      }
      UpdateUserInfoAbout(userInfoAboutDto:UserInfoAboutDto):Observable<SingleResponseModel<UserInfoAboutDto>>{
        let path=this.apiUrl+"UserInfo/UpdateUserInfoAbout";
        return this.httpClient.post<SingleResponseModel<UserInfoAboutDto>>(path,userInfoAboutDto);
      }
      UpdateUserInfoPersonal(userInfoPersonalDto:UserInfoPersonalDto):Observable<SingleResponseModel<UserInfoPersonalDto>>{
        let path=this.apiUrl+"UserInfo/UpdateUserInfoPersonal";
        return this.httpClient.post<SingleResponseModel<UserInfoPersonalDto>>(path,userInfoPersonalDto);
      }
      GetUserinfoByUserId():Observable<SingleResponseModel<UserInfos>>{
        let path=this.apiUrl+"UserInfo/getByUserId";
        return this.httpClient.get<SingleResponseModel<UserInfos>>(path);
      }
}
