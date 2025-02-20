import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responsModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private httpClient:HttpClient) { }

  uploadImage(selectedFile:File): Observable<ResponseModel> {

    const formData = new FormData();
  formData.append('image', selectedFile);
   return  this.httpClient.post<ResponseModel>('http://localhost:46772/api/Photo/upload',formData);
}

}
