import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserAllInfo } from '../../models/userAllInfo';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { UserinfoService } from '../../services/userinfo.service';
import { response } from 'express';
import { UserInfoApplicantDto } from '../../models/userInfoApplicantDto';
import { UserInfo } from 'os';
import { UserInfos } from '../../models/userInfo';
import { UserInfoPersonalDto } from '../../models/userInfoPersonalDto';
import { Skill } from '../../models/skill';
import { UserInfoAboutDto } from '../../models/userInfoAboutDto';
import { switchMap } from 'rxjs';
import { EducationInfo } from '../../models/educationInfo';
import { Console } from 'console';
import { EducationInfoDto } from '../../models/educationInfoDto';
import { EducationInfoService } from '../../services/education-info.service';
import { DateformatPipe } from "../../app/pipes/dateformat.pipe";
import { CertificatesDto } from '../../models/certificatesDto';
import { Certificate } from 'crypto';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [CommonModule, FormsModule, DateformatPipe],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.css'
})
export class UserinfoComponent {
   userinfo:UserAllInfo| null = null;;
    id:number;
    dataLoaded=false;
    isEditing = false; 
    isInfo=false;
    isEducationEditing=false;
    isWorkExperienceEditing=false;
    isPersonalInfoEditing: boolean = false;
    isLanguageEditing=false;
    isCertificateEditing = false;

      constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,
        private router:Router,private userinfoService:UserinfoService,private educationInfoService:EducationInfoService,private certificateService:CertificateService){
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
    addSkill() {
      if (this.userinfo) {
        const newSkill: Skill = {
          skillId:  0, 
          userId: 0, 
          name: '', 
          proficiency: 50, 
        };
        this.userinfo.skills.push(newSkill); // Yeni skill ekleniyor
      }
    }
    addEducation(){
      if (this.userinfo) {
        const newEducation: EducationInfo = {
          department:'',
          educationInfoId:0,
          universityName:'',
          finishDate:undefined,
          gpa:0,
          grade:'',
          gradeSystem:'',
          startDate:undefined,
          userId: 0,

        };
        this.userinfo.educationInfo.push(newEducation); // Yeni skill ekleniyor
      }
    }
    updateGpaLimits(education: any) {
      if (education.gradeSystem === 'Dörtlük Sistem') {
        if (education.gpa > 4) education.gpa = 4;
        if (education.gpa < 0) education.gpa = 0;
      } else if (education.gradeSystem === 'Yüzlük Sistem') {
        if (education.gpa > 100) education.gpa = 100;
        if (education.gpa < 1) education.gpa = 1;
      }
    }
    
    deleteSkill(index: number) {
      if (this.userinfo) {
        this.userinfo.skills.splice(index, 1);
      }
    }
    deleteEducationInfo(index: number) {
      if (this.userinfo) {
        this.userinfo.educationInfo.splice(index, 1); 
      }
    }
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing == false) {
        const userInfoAbout: UserInfoAboutDto = {
          bio: this.userinfo?.userInfos.bio,
          salaryException: this.userinfo?.userInfos.salaryException,
          skills: this.userinfo?.skills,
        };
      
        this.userinfoService.UpdateUserInfoAbout(userInfoAbout).pipe(
          switchMap(response => {
            this.toastrService.info(response.message);
            return this.userinfoService.GetUserinfoByUserId(); // İlk API bitince ikinci başlasın
          })
        ).subscribe(
          response => {
            const storedUserInfo = localStorage.getItem('userAllInfo');
            if (storedUserInfo) {
              let userInfo: UserAllInfo = JSON.parse(storedUserInfo);
              userInfo.userInfos = response.data;
              this.userinfo!.userInfos= response.data;
              localStorage.setItem('userAllInfo', JSON.stringify(userInfo));
            }
          },
          responseError => {
            this.toastrService.error(responseError.error, 'Hata');
          }
        );
      }
      
    }
    toggleEditinfo(userInfo:UserInfos) {
      this.isInfo=!this.isInfo;
      if(this.isInfo==false){
        const userInfoApplication: UserInfoApplicantDto = {
          livingLocation:userInfo.livingLocation,
          nationality:userInfo.nationality,
          nationalityId:userInfo.nationalityId,
          phone:userInfo.phone
          };
    this.userinfoService.UpdateUserInfoApplicant(userInfoApplication).pipe(
      switchMap(response => {
        this.toastrService.info(response.message);
        return this.userinfoService.GetUserinfoByUserId(); // İlk API bitince ikinci başlasın
      })
    ).subscribe(
      response => {
        const storedUserInfo = localStorage.getItem('userAllInfo');
        if (storedUserInfo) {
          let userInfo: UserAllInfo = JSON.parse(storedUserInfo);
          userInfo.userInfos = response.data;
          this.userinfo!.userInfos= response.data;
          localStorage.setItem('userAllInfo', JSON.stringify(userInfo));
        }
      },
      responseError => {
        this.toastrService.error(responseError.error, 'Hata');
      }
    );
      }
   
    }
    toggledutc() {
      this.isEducationEditing= !this.isEducationEditing;
      if(this.isEducationEditing==false){
        const educationInfoDto: EducationInfoDto = {
          userId:0,
          educationInfos:this.userinfo!.educationInfo

          };
    this.educationInfoService.UpdateEducationInfo(educationInfoDto).pipe(
      switchMap(response => {
        this.toastrService.info(response.message);
        return this.educationInfoService.GetEducationInfoByUserId(); // İlk API bitince ikinci başlasın
      })
    ).subscribe(
      response => {
        const storedUserInfo = localStorage.getItem('userAllInfo');
        if (storedUserInfo) {
          let userInfo: UserAllInfo = JSON.parse(storedUserInfo);
          userInfo.educationInfo = response.data;
          this.userinfo!.educationInfo!= response.data;
          localStorage.setItem('userAllInfo', JSON.stringify(userInfo));
        }
      },
      responseError => {
        this.toastrService.error(responseError.error, 'Hata');
      }
    );
  
      }
    }
    toggleEditPersonalInfo(userInfo:UserInfos) {
      this.isPersonalInfoEditing = !this.isPersonalInfoEditing;
      if(this.isPersonalInfoEditing==false){
        const userInfoPersonal: UserInfoPersonalDto = {
          smoke:userInfo.smoke,
          birthDate:userInfo.birthDate,
          birthPlace:userInfo.birthplace,
          disabilityStatus:userInfo.disabilityStatus,
          gender:userInfo.gender,
          militaryServiceInfo:userInfo.militaryServiceInfo,

          };
    this.userinfoService.UpdateUserInfoPersonal(userInfoPersonal).pipe(
      switchMap(response => {
        this.toastrService.info(response.message);
        return this.userinfoService.GetUserinfoByUserId(); // İlk API bitince ikinci başlasın
      })
    ).subscribe(
      response => {
        const storedUserInfo = localStorage.getItem('userAllInfo');
        if (storedUserInfo) {
          let userInfo: UserAllInfo = JSON.parse(storedUserInfo);
          userInfo.userInfos = response.data;
          this.userinfo!.userInfos= response.data;
          localStorage.setItem('userAllInfo', JSON.stringify(userInfo));
        }
      },
      responseError => {
        this.toastrService.error(responseError.error, 'Hata');
      }
    );
  
      }
    }
    toggleworkexp() {
      this.isWorkExperienceEditing= !this.isWorkExperienceEditing;
    }
  
    toggleLanguageEditing(){
      this.isLanguageEditing=!this.isLanguageEditing;
    }
    toggleCertificateEditing(){
      this.isCertificateEditing = !this.isCertificateEditing;
      if(this.isCertificateEditing==false){
        const certificatesDto: CertificatesDto = {
          userId:0,
          certificates:this.userinfo!.certificates

          };
    this.certificateService.UpdateCertificate(certificatesDto).pipe(
      switchMap(response => {
        this.toastrService.info(response.message);
        return this.userinfoService.GetUserinfoByUserId(); // İlk API bitince ikinci başlasın
      })
    ).subscribe(
      response => {
        const storedUserInfo = localStorage.getItem('userAllInfo');
        if (storedUserInfo) {
          let userInfo: UserAllInfo = JSON.parse(storedUserInfo);
          userInfo.userInfos = response.data;
          this.userinfo!.userInfos= response.data;
          localStorage.setItem('userAllInfo', JSON.stringify(userInfo));
        }
      },
      responseError => {
        this.toastrService.error(responseError.error, 'Hata');
      }
    );
  
      }
    }
 setUserInfoData(userAllInfo: UserAllInfo): void {
    localStorage.setItem('userAllInfo', JSON.stringify(userAllInfo));  
  }
  gomain(){

    this.router.navigate([`homepage`]);
  }
  getUserInfoDataFromStorage(): UserAllInfo | null {
    const userAllInfoData = localStorage.getItem('userAllInfo');
    return userAllInfoData ? JSON.parse(userAllInfoData) : null;
  }
  ngOnDestroy(): void {
    localStorage.removeItem('userAllInfo'); 
  }
}
