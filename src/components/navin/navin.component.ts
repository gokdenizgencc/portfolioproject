import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { UserinfoService } from '../../services/userinfo.service';
import { UserSearchResultDto } from '../../models/UserSearchResultDto';
import { UserAllInfo } from '../../models/userAllInfo';

@Component({
  selector: 'app-navin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule,],
  templateUrl: './navin.component.html',
  styleUrl: './navin.component.css'
})
export class NavinComponent {
  isUserLoggedIn: boolean = false;
  user:User
  id:number;
  searchTerm = '';
  searchResults: UserSearchResultDto[] = [];
  showDropdown = false;
  userinfo:UserAllInfo;
  private searchTerms = new Subject<string>();
  constructor(private userService:UserService,private authService:AuthService,private router:Router,private httpClient:HttpClient,private userInfoService:UserinfoService){
  
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
        // API'nize uygun URL'yi kullanın
        return this.userInfoService.SearchByNickname(term);
      })
    ).subscribe(results => {
      this.searchResults = results.data;
    });
    this.islogin()
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
  islogin(){
    this.isUserLoggedIn= this.authService.isAuthenticated();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']).then(() => {

      window.location.reload();
    });
  }
  navigatecv(userinfo:UserAllInfo){
        this.userService.setUserAllInfoData(userinfo)
        this.router.navigate([`/cvpage/${userinfo.username}`]);
    
  }
}
