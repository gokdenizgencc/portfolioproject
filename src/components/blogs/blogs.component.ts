import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { UserService } from '../../services/user.service';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectWithPhotoDto } from '../../models/ProjectWithPhotoDto';
import { response } from 'express';


@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  dataLoaded:Boolean
  projects:ProjectWithPhotoDto[];
  isBlogPage: boolean = false; 
  blogs:Blog[];
    constructor(private blogService:BlogService,private projectService:ProjectService,private toastrService:ToastrService,private router:Router,private activatedRoute: ActivatedRoute){
  
    }
  ngOnInit():void{
    this.activatedRoute.url.subscribe(urlSegment => {
      const firstSegment = urlSegment[0]?.path; // URL'nin ilk segmenti
      if (firstSegment === 'blogs') {
        this.isBlogPage = true;
        this.getBlogs();
      } else {
        this.isBlogPage = false;
        this.getProject();
      }
    });
  }
  getBlogs(){
    this.blogService.getAllBlogById().subscribe(response=>{
      this.blogs=response.data;
      this.dataLoaded=true;
    },  responseError => {
      this.toastrService.error(responseError.error, 'Hata', {
        
      });
    }
  );
  }
  goToBlogDetail( blog: Blog){
    this.blogService.setBlogData(blog);
    this.router.navigate([`/blogs/${blog.blogId}`]);
  }
  getProject(){
    this.projectService.getProjectWithDetail().subscribe(response=>{
      this.projects=response.data;
      this.dataLoaded=true;
    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    }
  )
  }
}
