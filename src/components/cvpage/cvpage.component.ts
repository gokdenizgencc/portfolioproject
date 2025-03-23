import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {  ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserAllInfo } from '../../models/userAllInfo';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserSearchResultDto } from '../../models/UserSearchResultDto';

@Component({
  selector: 'app-cvpage',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './cvpage.component.html',
  styleUrl: './cvpage.component.css'
})
export class CvpageComponent {
     userinfo:UserAllInfo| null = null;
     userinfof:UserAllInfo| null = null;;
     username: string;
     isOwnPage: boolean = false;
     dataLoaded=false;
     private userSearchResultDto: UserSearchResultDto | null = null;
      constructor(private userService:UserService,private router:Router,private route: ActivatedRoute,private toastrService:ToastrService,){
      }
    ngOnInit():void{
      this.route.paramMap.subscribe(params => {
        this.username = this.route.snapshot.paramMap.get('username') || '';
        this.GetData();
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

    getUserInfoDataFromStorage(): UserAllInfo | null {
      const userAllInfoData = localStorage.getItem('userinfo');
      return userAllInfoData ? JSON.parse(userAllInfoData) : null;
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
    ngOnDestroy(): void {
      localStorage.removeItem('userinfoo');
    }
  gomain(){

    this.router.navigate([`homepage`]);
  }
  gouserinfo(userinfo:UserAllInfo){

    this.router.navigate([`userinfo/${userinfo.userInfos.nickName}`]);
  }

  

}
