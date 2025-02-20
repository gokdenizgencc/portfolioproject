import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/responsModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ImageUpload } from '../models/imageUpload';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private httpClient:HttpClient) { }

  uploadImage(selectedFile:File): Observable<SingleResponseModel<ImageUpload>> {

    const formData = new FormData();
  formData.append('image', selectedFile);
   return this.httpClient.post<SingleResponseModel<ImageUpload>>('http://localhost:46772/api/Photo/upload',formData);
}

}
