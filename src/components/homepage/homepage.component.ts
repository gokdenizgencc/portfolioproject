import { Component } from '@angular/core';
import { NaviComponent } from '../navi/navi.component';
import { ProjectComponent } from '../project/project.component';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserAllInfo } from '../../models/userAllInfo';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ RouterModule,CommonModule,ToastrModule],
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


    });

  }
  truncate(content: string, wordLimit: number = 40): string {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  }
}
