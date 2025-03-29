import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { ProjectService } from '../../services/project.service';
import { PhotoService } from '../../services/photo.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAllInfo } from '../../models/userAllInfo';
import { Blog } from '../../models/blog';
import { ProjectDto } from '../../models/projectDto';
import { ProjectWithPastPhotoDto } from '../../models/projectWithPastPhotoDto';
import { BlogDto } from '../../models/blogDto';
import { Location } from '@angular/common';
@Component({
  selector: 'app-updateblog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './updateblog.component.html',
  styleUrl: './updateblog.component.css'
})
export class UpdateblogComponent {
   isUploading = false; 
   isValidUrl: boolean = true;
      userinfo:UserAllInfo;
    selectedFile:File |null=null;
    blog: Blog | null = null;
    project: ProjectDto| null = null;
    isBlogPage: boolean = false; 
    pasttitle:string| null = null;
    previewUrl: string | ArrayBuffer | null = null;
  constructor(private location: Location,private router: Router, private blogService:BlogService,private activatedRoute: ActivatedRoute,private projectService:ProjectService,
    private photoService:PhotoService,private toastrService:ToastrService) {}
    ngOnInit(): void {
      this.activatedRoute.url.subscribe(urlSegment => {
        const firstSegment = urlSegment[0]?.path; 
        if (firstSegment === 'editblog') {
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
          this.previewUrl = this.blog!.blogPhoto;
        } else {
          const savedProject = this.getProjectDataFromStorage();
       
          if (savedProject) {
            this.project = savedProject; 
            this.pasttitle=this.project.title;
          } else {
       
            this.project = this.projectService.getProjectData();
            if (this.project) {
              this.pasttitle=this.project.title;
              this.setProjectData(this.project); 
            }
          }
          this.previewUrl = this.project!.photosUrls[0].projectPhotoUrl;
        }
      });
  
    }
    onFileSelected(event: any): void {
      // Seçilen dosyayı al
      this.selectedFile = event.target.files[0];
    
      if (!this.selectedFile) {
        console.error("Dosya seçilmedi!");
        return;
      }
    
      
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string; 
      };
      reader.readAsDataURL(this.selectedFile);
    
      
      this.isUploading = true;
    
      this.photoService.uploadImage(this.selectedFile).subscribe(response => {
        if (response && response.data && response.data.url) {
          localStorage.setItem("PhotoUrl", response.data.url);
        }
         this.isUploading = false;
      }, error => {
        console.error("Fotoğraf yüklenirken hata oluştu:", error);
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



    submitBlog() {
      this.blog!.blogPhoto=localStorage.getItem("PhotoUrl")?? this.blog?.blogPhoto!;
      const blogDto: BlogDto = {
        blogId:this.blog!.blogId,
        blogPhoto:this.blog!.blogPhoto,
        conte:this.blog!.conte,
        publishedAt:this.blog!.publishedAt,
        title:this.blog!.title,
      };
      this.blogService.updateBlogById(blogDto).subscribe(response=>{
        this.toastrService.info(response.message);
        this.blogService.getAllBlogById().subscribe(response=>{
          const storedUserInfo = localStorage.getItem('userinfo');
          if (storedUserInfo) {
            let userInfo: UserAllInfo = JSON.parse(storedUserInfo);   
            userInfo.blogs = response.data;
            localStorage.setItem('userinfo', JSON.stringify(userInfo));
          }
          localStorage.setItem('blogsData', JSON.stringify(response.data)); 
          this.location.back();
      
        })
     
  
      },
      responseError => {
        this.toastrService.error(responseError.error, 'Hata', {
  
        });
      })
    }
    submitProject() {
      if (!this.isValidGithubUrl(this.project!.projectUrl)) {
        this.toastrService.error('Lütfen geçerli bir GitHub linki girin!', 'Hata');
        return; 
      }
    
      const projectWithPhoto: ProjectWithPastPhotoDto = {
        projectId: this.project!.projectId,
        userId: this.project!.userId,
        title: this.project!.title,
        description: this.project!.description,
        projectUrl: this.project!.projectUrl!,
        createdAt: new Date(),
        projectPhotoUrl: localStorage.getItem("PhotoUrl") ?? this.project!.photosUrls[0].projectPhotoUrl!,
        pastProjectTitle: this.pasttitle!,
      };
    
      this.projectService.updateproject(projectWithPhoto).subscribe(response => {
        this.toastrService.info(response.message);
        this.projectService.getProjectByUserId().subscribe(response => {
          const storedUserInfo = localStorage.getItem('userinfo');
          if (storedUserInfo) {
            let userInfo: UserAllInfo = JSON.parse(storedUserInfo);
            userInfo.projects = response.data;
            localStorage.setItem('userinfo', JSON.stringify(userInfo));
          }
          localStorage.setItem('projectsData', JSON.stringify(response.data));
          this.location.back();
        });
      },
      responseError => {
        this.toastrService.error(responseError.error, 'Hata');
      });
    }
    
   
    isValidGithubUrl(url: string | undefined): boolean {
      if (!url || url.trim() === "") return true; 
      const regex = /^https:\/\/github\.com\/.*/;
      return regex.test(url);
    }
    cancel() {
      this.location.back();
    }
    cancelb() {
      this.location.back();
    }
}
