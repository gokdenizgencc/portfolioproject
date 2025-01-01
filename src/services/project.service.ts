import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

 apiUrl="http://localhost:46772/api/Projects/getAll";

  constructor(private httpClient:HttpClient) { }

  getProjects():Observable<ListResponseModel<Project>>{

    return this.httpClient.
      get<ListResponseModel<Project>>(this.apiUrl);
  }
}
