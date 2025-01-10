import { Component } from '@angular/core';
import { NaviComponent } from '../navi/navi.component';
import { ProjectComponent } from '../project/project.component';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserAllInfo } from '../../models/userAllInfo';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  userinfo:UserAllInfo;
    constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService){
  
    }
  ngOnInit():void{

  }

  getinfo(){
    this.userService.getAllUserİnformartion(1).subscribe(response=>{
      this.userinfo=response.data;
    })

  }
}
