import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../models/blog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { PhotoService } from '../../services/photo.service';
import { ProjectWithPhotoDto } from '../../models/ProjectWithPhotoDto';
import { ToastrService } from 'ngx-toastr';
import { UserAllInfo } from '../../models/userAllInfo';
import { Location } from '@angular/common';
@Component({
  selector: 'app-addblogpage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './addblogpage.component.html',
  styleUrl: './addblogpage.component.css'
})
export class AddblogpageComponent {
  isUploading = false; 
    userinfo:UserAllInfo;
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

  constructor(private location: Location,private router: Router, private blogService:BlogService,private activatedRoute: ActivatedRoute,private projectService:ProjectService,private photoService:PhotoService,private toastrService:ToastrService) {}

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
  
  
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string; // Base64 olarak önizleme için ata
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
  
  
  
  
  

  submitBlog() {
    this.blog.blogPhoto=localStorage.getItem("PhotoUrl")!;
    this.blogService.addblog(this.blog).subscribe(response=>{
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
      this.toastrService.error(responseError.error.Message, 'Hata', {

      });
    })
  }
  submitProject() {

      const projectWithPhoto: ProjectWithPhotoDto = {
        projectId: this.project.projectId, 
        userId: this.project.userId,  
        title: this.project.title,
        description: this.project.description,
        projectUrl: this.project.projectUrl,
        createdAt: new Date(),  
        projectPhotoUrl:localStorage.getItem("PhotoUrl")!,
        
      };
    this.projectService.addblog(projectWithPhoto).subscribe(response=>{
      this.toastrService.info(response.message);
      this.projectService.getProjectByUserId().subscribe(response=>{
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
      this.toastrService.error(responseError.error, 'Hata', {

      });
    })

  }
  gomain(){

    this.router.navigate([`projects`]);
  }
  goblog(){

    this.router.navigate([`blogs`]);
  }
  cancel() {
    this.location.back();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('PhotoUrl'); 
  }
}
