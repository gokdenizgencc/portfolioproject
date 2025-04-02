import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { UserinfoService } from '../../services/userinfo.service';
import { UserSearchResultDto } from '../../models/UserSearchResultDto';
import { UserAllInfo } from '../../models/userAllInfo';
import { BlogService } from '../../services/blog.service';
import { ProjectService } from '../../services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule,],
  templateUrl: './navin.component.html',
  styleUrl: './navin.component.css'
})
export class NavinComponent {

  user:User
  id:number;
  searchTerm = '';
  searchResults: UserSearchResultDto[] = [];
  showDropdown = false;
  userinfo:UserAllInfo;
  private searchTerms = new Subject<string>();
  constructor(private userService:UserService,private authService:AuthService,private router:Router,private httpClient:HttpClient,
    private userInfoService:UserinfoService,private blogService:BlogService,private projectService:ProjectService,    private toastrService: ToastrService,){

    }
  ngOnInit():void{
    
    this.getinfo();
 
    this.searchTerms.pipe(
      debounceTime(300),
      
    
      distinctUntilChanged(),
      
     
      switchMap((term: string) => {
        if (term.length < 2) {
          this.showDropdown = false;
          return [];
        }
        this.showDropdown = true;
       
        return this.userInfoService.SearchByNickname(term);
      })
    ).subscribe(results => {
      this.searchResults = results.data;
    });
    this.getid()

  }
  getid(){
    const idString = this.authService.getIntFromLocalStorage("nameIdentifier", 0);
    this.id = idString !== null ? parseInt(idString, 10) : 0;
  }
  getuser(){
    this.userService.getUser().subscribe(response=>{
      this.user=response.data;


    }
  );
 
  }
  getinfo() {
    const storedUserInfo = localStorage.getItem('userinfo');

    if (storedUserInfo) {
      this.userinfo = JSON.parse(storedUserInfo);

    } else {
      this.userService.getAllUserİnformartion().subscribe(
        (response) => {
          this.userinfo = response.data;
          localStorage.setItem('userinfo', JSON.stringify(this.userinfo)); 
        },
 
      );
    }
  }
  search(term: string): void {
    this.searchTerm = term;
    this.searchTerms.next(term);
  }
  

  navigateToProfile(userSearchResult: UserSearchResultDto): void {
    this.userService.setUserAllInfoDataOther(userSearchResult);
    this.router.navigate([`/cvpage/${userSearchResult.nickName}`]);
    this.searchTerm = '';
    this.showDropdown = false;
  }
  route(){
    this.router.navigate(["login"]); 
  }

  logout() {
    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate([""]);
        this.toastrService.success("Çıkış gerçekleşti");
      } else {
        this.toastrService.error("Çıkış yaparken bir hata oluştu.");
      }
    });
  }
  navigatecv(userinfo:UserAllInfo){
        this.userService.setUserAllInfoData(userinfo)
        this.router.navigate([`/cvpage/${userinfo.username}`]);
    
  }
  navigateProject(userinfo:UserAllInfo){
        this.projectService.setProjectsData(userinfo.projects);
        this.router.navigate([`projects/${userinfo.username}`]);

}
navigateBlog(userinfo:UserAllInfo){

    this.blogService.setBlogsData(userinfo.blogs);
    this.router.navigate([`blogs/${userinfo.username}`]);


}
navigateHomepage(userinfo:UserAllInfo){
  this.userService.setUserAllInfoData(userinfo)
  this.router.navigate([`/homepage`]);

}
}
