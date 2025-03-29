import { Component } from '@angular/core';
import { NaviComponent } from '../navi/navi.component';
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
import { FormsModule } from '@angular/forms';
import { SocialLinkService } from '../../services/social-link.service';
import { SocialLinkDto } from '../../models/socialLinkDto';
import { SocialLink } from '../../models/socialLink';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ RouterModule,CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  userinfo:UserAllInfo;
  id:number;
  isEditing: boolean = false;
  socialLinks:SocialLink[];
  isValidGitHub: boolean = true;
isValidLinkedIn: boolean = true;
private originalGithub: string = "";
private originalWebsite: string = "";
private originalLinkedIn: string = "";

  dataLoaded=false;
    constructor(private userService:UserService,
      private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private router:Router,private blogService:BlogService,private projectService:ProjectService,
      private socialLinkService:SocialLinkService){
    }
  ngOnInit():void{
    this.getinfo();

  }
 
  startEditing() {
   
    this.originalGithub = this.userinfo.github;
    this.originalWebsite = this.userinfo.website;
    this.originalLinkedIn = this.userinfo.linkedIn;
  
    this.isEditing = true;
  }
  saveLinks(github: string, website: string, linkedIn: string) {

    this.validateLinks(); 
  
    if (!this.isValidGitHub || !this.isValidLinkedIn) {
      this.toastrService.error('Lütfen geçerli bir link girin.', 'Hata');
      return; 
    }
  
    this.userinfo.socialLinks.forEach(link => {
      if (link.platform === 'Github') {
        link.url = github;  
      } else if (link.platform === 'LinkedIn') {
        link.url = linkedIn;  
      } else if (link.platform === 'Website') {
        link.url = website;  
      }
    });
  
    
    const socialLinkDto: SocialLinkDto = {
      userId: 0,
      socialLinks: this.userinfo.socialLinks
    };
  
    this.socialLinkService.UpdateSocialLink(socialLinkDto).subscribe(
      response => {
        this.toastrService.info(response.message);
        this.userinfo!.github = github;
        this.userinfo!.linkedIn = linkedIn;
        this.userinfo!.website = website;
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
      },
      responseError => {
        this.toastrService.error(responseError.error.Message, 'Hata');
      }
    );
  
    this.isEditing = false;
  }
  cancelEditing() {

    this.userinfo.github = this.originalGithub;
    this.userinfo.website = this.originalWebsite;
    this.userinfo.linkedIn = this.originalLinkedIn;
  
    this.isEditing = false;
  }
  validateLinks() {
    const githubRegex = /^https:\/\/github\.com\/.*/;
    const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/.*/;
  
    this.isValidGitHub = !this.userinfo.github || githubRegex.test(this.userinfo.github);
    this.isValidLinkedIn = !this.userinfo.linkedIn || linkedInRegex.test(this.userinfo.linkedIn);
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
  goaddproject(){
    this.router.navigate([`projects/add`]);
  }
  goaddblog(){
    this.router.navigate([`blogs/add`]);
  }
  truncate(content: string, wordLimit: number = 7): string {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  }
  getProfileImage(photoUrl: string): string {
    return photoUrl ? photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  }
 
  goToBlog(blog:Blog){
  
    this.blogService.setBlogData(blog);
    this.router.navigate([`/blog/${blog.blogId}`]);
  }
  goToProject(project:ProjectDto){
    this.projectService.setProjectData(project);
    this.router.navigate([`/project/${project.projectId}`]);
  }
  goProject(userinfo:UserAllInfo){
    this.projectService.setProjectsData(userinfo.projects);
    this.router.navigate([`projects/${userinfo.username}`]);
  }
  goBlock(userinfo:UserAllInfo){
    this.blogService.setBlogsData(userinfo.blogs);
    this.router.navigate([`blogs/${userinfo.username}`]);
  }
  goToInfo(userinfo:UserAllInfo){
    this.userService.setUserAllInfoData(userinfo)
    this.router.navigate([`userinfo/${userinfo.username}`]);
  }
  goToCv(userinfo:UserAllInfo){
    this.userService.setUserAllInfoData(userinfo)
    this.router.navigate([`/cvpage/${userinfo.username}`]);
  }
}
