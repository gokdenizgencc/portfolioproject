import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Blog } from '../../models/blog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-addblogpage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './addblogpage.component.html',
  styleUrl: './addblogpage.component.css'
})
export class AddblogpageComponent {
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

  constructor(private router: Router, private http: HttpClient,private blogService:BlogService,private activatedRoute: ActivatedRoute) {}

  ngOnInit():void{
    this.activatedRoute.url.subscribe(urlSegment => {
      const firstSegment = urlSegment[0]?.path; 
      if (firstSegment === 'blogs') {
        this.isBlogPage = true;
   
      } else {

      }
    });
  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      
      // Fotoğrafı backend'e gönder
      this.uploadPhoto(file).subscribe((response: any) => {
        // Backend'den dönen URL'yi blog modeline ekle
        this.blog.blogPhoto = response.photoUrl; // URL'yi alıp blog objesine ekledik
        console.log('Fotoğraf yüklendi, URL:', response.photoUrl);
      });
    }
  }

  // Fotoğrafı API'ye gönderme
  uploadPhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file); // FormData ile fotoğrafı ekliyoruz

    return this.http.post<any>('https://your-backend-api-url.com/upload', formData);
  }

  submitBlog() {

    this.blogService.addblog(this.blog).subscribe(response=>{
      var result=response;
  
    })
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
