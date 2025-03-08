import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CertificatesDto } from '../models/certificatesDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseListModel } from '../models/ResponseListModel';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  apiUrl="http://localhost:46772/api/";
  constructor(private httpClient:HttpClient) { }
      UpdateCertificate(certificatesDto:CertificatesDto):Observable<ResponseListModel<CertificatesDto>>{ 
          let path=this.apiUrl+"Certificates/updatecertificate";
          return this.httpClient.post<ResponseListModel<CertificatesDto>>(path,certificatesDto);
        }
}
