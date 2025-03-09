import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CertificatesDto } from '../models/certificatesDto';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsModel';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  apiUrl="http://localhost:46772/api/";
  constructor(private httpClient:HttpClient) { }
      UpdateCertificate(certificatesDto:CertificatesDto):Observable<ResponseModel>{ 
          let path=this.apiUrl+"Certificates/updatecertificate";
          return this.httpClient.post<ResponseModel>(path,certificatesDto);
        }
}
