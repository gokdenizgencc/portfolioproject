import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { response } from 'express';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { group } from 'console';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  
  projects:Project[]=[];
  currentProject:Project;
constructor(private projectService:ProjectService){}

ngOnInit(): void{
 this.getProject();
}
onProjectClick(project:Project) {
  this.currentProject=project
console.log("Tıklaıdn:"+project.title)
}
getProject(){
  this.projectService.getProjects().subscribe(response=>{
    this.projects=response.data

  })
}
getCurrentProjectClass(project:Project){
  if(project==this.currentProject){
    return "list-group-item active"
  }
  else{
    return "list-group-item"
  }
}
getAllProjectClass(){
  if(!this.currentProject){
    return "list-group-item active"
  } 
  else{
    return "list-group-item"
  }
}
}
