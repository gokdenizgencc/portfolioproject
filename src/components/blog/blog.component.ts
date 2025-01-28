import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProjectDto } from '../../models/projectDto';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

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
  constructor(private route: ActivatedRoute, private blogService: BlogService,private sanitizer: DomSanitizer,private activatedRoute: ActivatedRoute,private projectService:ProjectService) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(urlSegment => {
      const firstSegment = urlSegment[0]?.path; 
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
}