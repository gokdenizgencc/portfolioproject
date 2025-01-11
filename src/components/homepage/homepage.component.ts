import { Component } from '@angular/core';
import { NaviComponent } from '../navi/navi.component';
import { ProjectComponent } from '../project/project.component';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserAllInfo } from '../../models/userAllInfo';
import {  ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ RouterModule,CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  userinfo:UserAllInfo;
  dataLoaded=false;
    constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService){
  
    }
  ngOnInit():void{
    this.getinfo();
  }

  getinfo(){
    this.userService.getAllUserİnformartion(1).subscribe(response=>{
      this.userinfo=response.data;
      this.dataLoaded=true;


    },  responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    }
  );

  }
  truncate(content: string, wordLimit: number = 40): string {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  }
  getProfileImage(photoUrl: string): string {
    return photoUrl ? photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  }
}
