import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Blog } from '../../models/blog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { PhotoService } from '../../services/photo.service';
import { response } from 'express';

@Component({
  selector: 'app-addblogpage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './addblogpage.component.html',
  styleUrl: './addblogpage.component.css'
})
export class AddblogpageComponent {
  selectedFile:File |null=null;
  blog: Blog = {
    title: '',
    conte: '',
    blogPhoto: '',
    blogId: 0,
    userId: 0,
    publishedAt: new Date(),
  };
  project: Project = {
    title: '',
    description:'',
    projectUrl:'',
    projectId: 0,
    userId: 0,
    createdAt: new Date(),
  };
  isBlogPage: boolean = false; 
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private router: Router, private http: HttpClient,private blogService:BlogService,private activatedRoute: ActivatedRoute,private projectService:ProjectService,private photoService:PhotoService) {}

  ngOnInit():void{
    this.activatedRoute.url.subscribe(urlSegment => {
      const firstSegment = urlSegment[0]?.path; 
      if (firstSegment === 'blogs') {
        this.isBlogPage = true;
   
      } else {

      }
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      console.error("Dosya seçilmedi!");
      return;
    }
    this.photoService.uploadImage(this.selectedFile).subscribe(response=>{
      var result =response;

    },)
  }
  
  
  
  
  

  submitBlog() {

    this.blogService.addblog(this.blog).subscribe(response=>{
      var result=response;
  
    })
  }
  submitProject() {

    this.projectService.addblog(this.project).subscribe(response=>{
      var result=response;
  
    })
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
