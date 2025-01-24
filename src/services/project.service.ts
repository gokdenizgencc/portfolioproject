import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProjectWithPhotoDto } from '../models/ProjectWithPhotoDto';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

 apiUrl="http://localhost:46772/api/Projects/";
  constructor(private httpClient:HttpClient) { }

  getProjects():Observable<ListResponseModel<Project>>{
    return this.httpClient.
      get<ListResponseModel<Project>>(this.apiUrl+"getAll");
  }
  getProjectWithDetail():Observable<ListResponseModel<ProjectWithPhotoDto>>{
    return this.httpClient.
    get<ListResponseModel<ProjectWithPhotoDto>>(this.apiUrl+"getAllProjectDetailById");
  }
}
