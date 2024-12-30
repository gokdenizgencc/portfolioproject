import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/ListResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

 apiUrl="https://localhost:44359/api/Projects/getAll";

  constructor(private httpClient:HttpClient) { }

  getProjects():Observable<ListResponseModel<Project>>{

    return this.httpClient.
      get<ListResponseModel<Project>>(this.apiUrl);
  }
}
