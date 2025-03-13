import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responsModel';
import { SocialLinkDto } from '../models/socialLinkDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialLinkService {
 apiUrl="http://localhost:46772/api/SocialLinks/"; 
  constructor(private httpClient:HttpClient) { }
     UpdateSocialLink(SocialLinkDto:SocialLinkDto):Observable<ResponseModel>{  
              let path=this.apiUrl+"updatesociallink";
              return this.httpClient.post<ResponseModel>(path,SocialLinkDto);
            }
}
