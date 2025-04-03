import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProjectDto } from '../../models/projectDto';
import { ProjectService } from '../../services/project.service';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserAllInfo } from '../../models/userAllInfo';

@Component({
  selector: 'app-blog',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blog: Blog | null = null;
  project: ProjectDto| null = null;
  safeUrl: SafeUrl;
  isBlogPage: boolean = false; 
  username: string;
   userinfo:UserAllInfo| null = null;
  constructor(private location: Location,private authService:AuthService,private route: ActivatedRoute,private router:Router, private blogService: BlogService,private sanitizer: DomSanitizer,private activatedRoute: ActivatedRoute,private projectService:ProjectService) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(urlSegment => {
      const firstSegment = urlSegment[0]?.path; 
      this.username=urlSegment[1]?.path; 
      const savedCurrentUserInfo = this.getUserInfoDataFromStorage();
      if (savedCurrentUserInfo) {
        this.userinfo = savedCurrentUserInfo;
      }
      if (firstSegment === 'blogs') {
        this.isBlogPage = true;
        const savedBlog = this.getBlogDataFromStorage();
        if (savedBlog) {
          this.blog = savedBlog; 
        } else {
     
          this.blog = this.blogService.getBlogData();
          if (this.blog) {
            this.setBlogData(this.blog); 
          }
        }
      } else {
        const savedProject = this.getProjectDataFromStorage();
        if (savedProject) {
          this.project = savedProject; 
        } else {
     
          this.project = this.projectService.getProjectData();
          if (this.project) {
            this.setProjectData(this.project); 
          }
        }
      }
    });

  }
  openProjectUrl() {
    if (this.project?.projectUrl?.trim()) {
      window.open(this.project.projectUrl, '_blank');
    }
  }
  setBlogData(blog: Blog): void {
    localStorage.setItem('blogData', JSON.stringify(blog));  
  }

  getBlogDataFromStorage(): Blog | null {
    const blogData = localStorage.getItem('blogData');
    return blogData ? JSON.parse(blogData) : null;
  }
  setProjectData(project: ProjectDto): void {
    localStorage.setItem('projectData', JSON.stringify((project)));  
  }

  getProjectDataFromStorage(): ProjectDto | null {
    const projectData = localStorage.getItem('projectData');
    return projectData ? JSON.parse(projectData) : null;
  }
  ngOnDestroy(): void {
    localStorage.removeItem('blogData'); 
    localStorage.removeItem('projectData'); 
  }
  goProject(){
    this.location.back();
  }
  goblog(){
    this.location.back();
  }
    getUserInfoDataFromStorage(): UserAllInfo | null {
      const userAllInfoData = localStorage.getItem('userinfo');
      return userAllInfoData ? JSON.parse(userAllInfoData) : null;
    }
}