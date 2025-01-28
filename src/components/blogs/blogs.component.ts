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
import { ProjectDto } from '../../models/projectDto';


@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  blogs: Blog[] | null = null;
  projectss:ProjectDto[] | null = null;
  dataLoaded:Boolean
  projects:ProjectWithPhotoDto[];
  isBlogPage: boolean = false; 
    constructor(private blogService:BlogService,private projectService:ProjectService,private toastrService:ToastrService,private router:Router,private activatedRoute: ActivatedRoute){
  
    }
  ngOnInit():void{
    this.activatedRoute.url.subscribe(urlSegment => {
      const firstSegment = urlSegment[0]?.path; 
      if (firstSegment === 'blogs') {
        this.isBlogPage = true;
        const savedBlog = this.getBlogsDataFromStorage();
        if (savedBlog) {
          this.blogs = savedBlog; 
        } else {
     
          this.blogs = this.blogService.getBlogsData();
          if (this.blogs) {
            this.setBlogsData(this.blogs); 
          }
        }
      } else {
        const savedBlog = this.getProjectsDataFromStorage();
        if (savedBlog) {
          this.projectss = savedBlog; 
        } else {
     
          this.projectss = this.projectService.getProjectsData();
          if (this.projectss) {
            this.setProjectsData(this.projectss); 
          }
        }
      }
    });
  }
  setBlogsData(blog: Blog[]): void {
    localStorage.setItem('blogsData', JSON.stringify(blog));  
  }

  getBlogsDataFromStorage(): Blog[] | null {
    const blogData = localStorage.getItem('blogsData');
    return blogData ? JSON.parse(blogData) : null;
  }
  setProjectsData(projects: ProjectDto[]): void {
    localStorage.setItem('projectsData', JSON.stringify(projects));  
  }
  getProjectsDataFromStorage(): ProjectDto[] | null {
    const blogData = localStorage.getItem('projectsData');
    return blogData ? JSON.parse(blogData) : null;
  }

  goToBlogDetail(blog: Blog){
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
  goToProject(project:ProjectDto){
    this.projectService.setProjectData(project);
    this.router.navigate([`/projects/${project.projectId}`]);
  }
  ngOnDestroy(): void {
    localStorage.removeItem('blogsData'); 
    localStorage.removeItem('projectsData'); 
  }
  
}
