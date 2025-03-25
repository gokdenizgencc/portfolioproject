import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Blog } from '../../models/blog';
import { UserService } from '../../services/user.service';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectWithPhotoDto } from '../../models/ProjectWithPhotoDto';
import { response } from 'express';
import { ProjectDto } from '../../models/projectDto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Project } from '../../models/project';
import { DeleteConfirmDialog } from '../delete-confirm-dialog/delete-confirm-dialog.component';
import { UserAllInfo } from '../../models/userAllInfo';
import { ProjectWithPastPhotoDto } from '../../models/projectWithPastPhotoDto';
import { BlogDto } from '../../models/blogDto';
import { DeleteConfirmDialogBlog } from '../delete-confirm-dialog-blog/delete-confirm-dialog-blog.component';
import { Location } from '@angular/common';
import { UserSearchResultDto } from '../../models/UserSearchResultDto';
@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  userinfo:UserAllInfo| null = null;
  blogs: Blog[] | null = null;
  projectss:ProjectDto[] | null = null;
  dataLoaded:Boolean
  projects:ProjectWithPhotoDto[];
  pasttitle:string| null = null;
  userinfof:UserAllInfo| null = null;;
  isBlogPage: boolean = false; 
  username: string;
      private userSearchResultDto: UserSearchResultDto | null = null;
    constructor(private location: Location,private blogService:BlogService,private projectService:ProjectService,
      private toastrService:ToastrService,private router:Router,private activatedRoute: ActivatedRoute,public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef,private userService:UserService){
  
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
  private GetData() {
    const savedCurrentUserInfo = this.getUserInfoDataFromStorage();
    if (savedCurrentUserInfo) {
      this.userinfof = savedCurrentUserInfo;
    } else {
      this.userinfof = this.userService.getUserAllInfoData();
      if (this.userinfof) {
        this.setUserInfoData(this.userinfof);
      }
    }
     if (this.username && this.username === this.userinfof?.userInfos.nickName) {
      const savedOwnInfo = this.getUserInfoDataFromStorage();
      if (savedOwnInfo) {
        this.userinfo = savedOwnInfo;
        this.dataLoaded = true;
      } else {
        this.userinfo = this.userService.getUserAllInfoData();
        if (this.userinfo) {
          this.setUserInfoData(this.userinfo);
        }
        this.dataLoaded = true;
      }
    }

    else if (this.userSearchResultDto = this.userService.getUserAllInfoDataOther()) {
      this.getinfoother();
    }

  

    else if (this.username && this.userinfof && this.username !== this.userinfof.userInfos.nickName) {
      const savedOtherInfo = this.getUserInfoDataFromStorageOt();
      if (savedOtherInfo && savedOtherInfo.userInfos.nickName === this.username) {
        this.userinfo = savedOtherInfo;
        this.dataLoaded = true;
      }

      else {
        this.getinfoByName(this.username);
      }
    }

    else if (this.username) {
      this.getinfoByName(this.username);
    }
  }
  setBlogsData(blog: Blog[]): void {
    localStorage.setItem('blogsData', JSON.stringify(blog));  
  }
  getUserInfoDataFromStorage(): UserAllInfo | null {
    const userAllInfoData = localStorage.getItem('userinfo');
    return userAllInfoData ? JSON.parse(userAllInfoData) : null;
  }
  getinfoother(){
    this.userService.getAllUserİnformartionOther(this.userSearchResultDto!.userId).subscribe(
      (response) => {
        this.userinfo = response.data;
        this.dataLoaded = true;
        localStorage.setItem('userinfoo', JSON.stringify(this.userinfo)); // Veriyi localStorage'a kaydet
      },
      (responseError) => {
        this.toastrService.error(responseError.error.Message, 'Hata', {});
      }
    );
  }
  getinfoByName(name:string) {
 
    this.userService.getAllUserİnformartionByNickName(name).subscribe(
      (response) => {
        this.userinfo = response.data;
        this.dataLoaded = true;
        localStorage.setItem('userinfoo', JSON.stringify(this.userinfo)); // Veriyi localStorage'a kaydet
      },
      (responseError) => {
        this.toastrService.error(responseError.error.Message, 'Hata', {});
      }
    );
  
}
  getUserInfoDataFromStorageOt(): UserAllInfo | null {
    const userAllInfoData = localStorage.getItem('userinfoo');
    return userAllInfoData ? JSON.parse(userAllInfoData) : null;
  }
  setUserInfoData(userAllInfo: UserAllInfo): void {
    localStorage.setItem('userinfo', JSON.stringify(userAllInfo));  
  }
  setUserInfoDataOt(userAllInfo: UserAllInfo): void {
    localStorage.setItem('userinfoo', JSON.stringify(userAllInfo));  
  }
  getBlogsDataFromStorage(): Blog[] | null {
    const blogData = localStorage.getItem('blogsData');
    return blogData ? JSON.parse(blogData) : null;
  }
  openDeleteDialog(project: Project): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    const projectWithPhoto: ProjectWithPastPhotoDto = {
      projectId: project!.projectId, 
      userId: project!.userId,  
      title: project!.title,
      description: project!.description,
      projectUrl: project!.projectUrl!,
      createdAt: new Date(),  
      projectPhotoUrl:localStorage.getItem("PhotoUrl")!,
      pastProjectTitle: project!.title,
    };
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProject(projectWithPhoto);
      }
    });
  }
  openDeleteDialogForBlog(blog: Blog) { 
    const dialogRef = this.dialog.open(DeleteConfirmDialogBlog );
    const blogDto: BlogDto = {
        blogId:blog!.blogId,
        blogPhoto:blog!.blogPhoto,
        conte: blog!.conte,
        publishedAt: blog!.publishedAt,
        title: blog!.title,
      };
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.deleteBlog(blogDto);
      }
    });
  }

  deleteProject(project: ProjectWithPastPhotoDto) {
    this.projectService.deleteproject(project).subscribe(response => {
      this.toastrService.info(response.message);
  
   
      this.projectService.getProjectByUserId().subscribe(response => {
        const storedUserInfo = localStorage.getItem('userinfo');
        if (storedUserInfo) {
          let userInfo: UserAllInfo = JSON.parse(storedUserInfo);
          userInfo.projects = response.data;
          localStorage.setItem('userinfo', JSON.stringify(userInfo));
        }
        localStorage.setItem('projectsData', JSON.stringify(response.data));

        this.projectss = response.data;
        this.changeDetectorRef.detectChanges();
      });
    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata');
    }); 
  }
  deleteBlog(blogDto: BlogDto) {
    
    this.blogService.deleteBlog(blogDto).subscribe(response => {
      this.toastrService.info(response.message);
  
   
      this.blogService.getAllBlogById().subscribe(response => {
        const storedUserInfo = localStorage.getItem('userinfo');
        if (storedUserInfo) {
          let userInfo: UserAllInfo = JSON.parse(storedUserInfo);
          userInfo.blogs = response.data;
          localStorage.setItem('userinfo', JSON.stringify(userInfo));
        }
        localStorage.setItem('projectsData', JSON.stringify(response.data));
  
      
        this.blogs = response.data;
        this.changeDetectorRef.detectChanges();
      });
    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata');
    });
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
    this.router.navigate([`/blog/${blog.blogId}`]);
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
    this.router.navigate([`/project/${project.projectId}`]);
  }
  navigateAdd(){
    this.router.navigate([`blogs/add`]);
  }
  gomain(){
    this.location.back();
  }
  navigateAddd(){

    this.router.navigate([`projects/add`]);
  }
  ngOnDestroy(): void {
    const currentUrl = this.router.url; 
    const segments = currentUrl.split('/'); 
    const pageName = segments[1]; 
    if (pageName=="blogs" || pageName=="projects" || pageName=="editblog" || pageName=="editproject"){

      
    }
    else{
      localStorage.removeItem('blogsData');
      localStorage.removeItem('projectsData');
    }
  }
  goedit(blog:Blog){
    this.blogService.setBlogData(blog);
    this.router.navigate([`editblog/${blog.blogId}`]);
  }
  goeditp(project:ProjectDto){
    this.projectService.setProjectData(project);
    this.router.navigate([`editproject/${project.projectId}`]);
  }
}
