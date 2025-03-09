import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkExperienceDto } from '../models/workExperienceDto';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsModel';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  apiUrl="http://localhost:46772/api/";
  constructor(private httpClient:HttpClient) { }
        UpdateWorkExperience(workExperienceDto:WorkExperienceDto):Observable<ResponseModel>{ 
            let path=this.apiUrl+"WorkExperience/updateworkexperience";
            return this.httpClient.post<ResponseModel>(path,workExperienceDto);
          }
}
