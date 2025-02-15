import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserAllInfo } from '../../models/userAllInfo';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.css'
})
export class UserinfoComponent {
   userinfo:UserAllInfo| null = null;;
    id:number;
    dataLoaded=false;
      constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private router:Router){
      }
    ngOnInit():void{
      const savedBlog = this.getUserInfoDataFromStorage();
      if (savedBlog) {
        this.userinfo = savedBlog; 
      } else {
   
        this.userinfo = this.userService.getUserAllInfoData();
        if (this.userinfo) {
          this.setUserInfoData(this.userinfo); 
        }
      }
      console.log(this.userinfo?.certificates[0].dateReceived)
  
    }
 setUserInfoData(userAllInfo: UserAllInfo): void {
    localStorage.setItem('userAllInfo', JSON.stringify(userAllInfo));  
  }

  getUserInfoDataFromStorage(): UserAllInfo | null {
    const userAllInfoData = localStorage.getItem('userAllInfo');
    return userAllInfoData ? JSON.parse(userAllInfoData) : null;
  }
  ngOnDestroy(): void {
    localStorage.removeItem('userAllInfo'); 
  }
}
