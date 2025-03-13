import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserAllInfo } from '../../models/userAllInfo';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { WorkExperienceService } from '../../services/work-experience.service';
import { ForeignLanguageService } from '../../services/foreign-language.service';
import { EducationInfoService } from '../../services/education-info.service';
import { CertificateService } from '../../services/certificate.service';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-cvpage',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './cvpage.component.html',
  styleUrl: './cvpage.component.css'
})
export class CvpageComponent {
     userinfo:UserAllInfo| null = null;;

      constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,
        private router:Router,private userinfoService:UserinfoService,private educationInfoService:EducationInfoService,
        private certificateService:CertificateService,private workExperienceService:WorkExperienceService,private foreignLanguageService:ForeignLanguageService){
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
  
    }
    getUserInfoDataFromStorage(): UserAllInfo | null {
      const userAllInfoData = localStorage.getItem('userinfo');
      return userAllInfoData ? JSON.parse(userAllInfoData) : null;
    }
    setUserInfoData(userAllInfo: UserAllInfo): void {
      localStorage.setItem('userinfo', JSON.stringify(userAllInfo));  
    }

  gomain(){

    this.router.navigate([`homepage`]);
  }

  

}
