import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EducationInfoDto } from '../models/educationInfoDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { EducationInfo } from '../models/educationInfo';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responsModel';

@Injectable({
  providedIn: 'root'
})
export class EducationInfoService {

   apiUrl="http://localhost:46772/api/";
   constructor(private httpClient:HttpClient) { }
      UpdateEducationInfo(educationInfoDto:EducationInfoDto):Observable<ResponseModel>{
                let path=this.apiUrl+"EducationInfo/updateeducation";
                return this.httpClient.post<ResponseModel>(path,educationInfoDto);
      }
         GetEducationInfoByUserId():Observable<ResponseModel>{
              let path=this.apiUrl+"EducationInfo/getByUserId";
              return this.httpClient.get<ResponseModel>(path);
            }

      
}
