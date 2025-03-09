import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForeignLanguageDto } from '../models/foreignLanguageDto';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsModel';

@Injectable({
  providedIn: 'root'
})
export class ForeignLanguageService {
 apiUrl="http://localhost:46772/api/";
  constructor(private httpClient:HttpClient) { }
        UpdateForeignLanguage(foreignLanguageDto:ForeignLanguageDto):Observable<ResponseModel>{  
            let path=this.apiUrl+"ForeignLanguage/updateforeignlanguage"; 
            return this.httpClient.post<ResponseModel>(path,foreignLanguageDto);
          }
}
