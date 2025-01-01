import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responsModel';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient:HttpClient) { }

  add(blog:Blog):Observable<ResponseModel>{
    var result=this.httpClient.post<ResponseModel>("https://localhost:44359/api/blogs/add",blog)
    return result
  }
}
