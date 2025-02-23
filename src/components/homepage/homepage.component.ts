import { Component } from '@angular/core';
import { NaviComponent } from '../navi/navi.component';
import { ProjectComponent } from '../project/project.component';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserAllInfo } from '../../models/userAllInfo';
import {  ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { ProjectDto } from '../../models/projectDto';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ RouterModule,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  userinfo:UserAllInfo;
  id:number;
  dataLoaded=false;
    constructor(private userService:UserService,private projectService:ProjectService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private router:Router,private blogService:BlogService,private authService:AuthService){
    }
  ngOnInit():void{
    this.getinfo();

  }
 
  

  getinfo() {
    const storedUserInfo = localStorage.getItem('userinfo');

    if (storedUserInfo) {
      this.userinfo = JSON.parse(storedUserInfo);
      this.dataLoaded = true;
    } else {
      this.userService.getAllUserİnformartion().subscribe(
        (response) => {
          this.userinfo = response.data;
          this.dataLoaded = true;
          localStorage.setItem('userinfo', JSON.stringify(this.userinfo)); // Veriyi localStorage'a kaydet
        },
        (responseError) => {
          this.toastrService.error(responseError.error.Message, 'Hata', {});
        }
      );
    }
  }

  truncate(content: string, wordLimit: number = 10): string {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  }
  getProfileImage(photoUrl: string): string {
    return photoUrl ? photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  }
  goBlock(blogs:Blog[]){
    this.blogService.setBlogsData(blogs);
    this.router.navigate(["blogs"]);
  }
  goToBlog(blog:Blog){
  
    this.blogService.setBlogData(blog);
    this.router.navigate([`/blogs/${blog.blogId}`]);
  }
  goToProject(project:ProjectDto){
    this.projectService.setProjectData(project);
    this.router.navigate([`/projects/${project.projectId}`]);
  }
  goProject(projects:ProjectDto[]){
    this.projectService.setProjectsData(projects);
    this.router.navigate(["projects"]);
  }
  goToInfo(userinfo:UserAllInfo){
    this.userService.setUserAllInfoData(userinfo)
    this.router.navigate(["userinfo"]);
  }
}
