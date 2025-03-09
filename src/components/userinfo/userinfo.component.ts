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
import { CertificatesDto } from '../../models/certificatesDto';
import { CertificateService } from '../../services/certificate.service';
import { Certificate } from '../../models/certificate';
import { WorkExperienceDto } from '../../models/workExperienceDto';
import { WorkExperienceService } from '../../services/work-experience.service';
import { WorkExperience } from '../../models/workExperience';
import { ForeignLanguageService } from '../../services/foreign-language.service';
import { ForeignLanguageDto } from '../../models/foreignLanguageDto';
import { ForeignLanguages } from '../../models/foreignLanguage';

@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    addSkill() {
      if (this.userinfo) {
        const newSkill: Skill = {
          skillId:  0, 
          userId: 0, 
          name: '', 
          proficiency: 50, 
        };
        this.userinfo.skills.push(newSkill); 
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
        this.userinfo.educationInfo.push(newEducation); 
      }
    }
    addCertificate(){
      if (this.userinfo) {
        const newCertificate: Certificate = {
          certificateId:0,
          certificateUrl:'',
          dateReceived:undefined,
          institution:'',
          title:'',
          userId:0

        };
        this.userinfo.certificates.push(newCertificate); 
      }
    }
    addWorkExperience(){ 
      if (this.userinfo) {
        const newWorkExperience: WorkExperience= {
          companyName:'',
          finalDate:undefined,
          province:'',
          role:'',
          userId:0,
          workExperienceId:0,
          startDate:undefined,
          shortWorkDefination:''

        };
        this.userinfo.workExperiences.push(newWorkExperience); 
      }
    }
    addForeignLanguage(){ 
      if (this.userinfo) {
        const newForeignLanguage: ForeignLanguages= {
          foreignLanguageId:0,
          language:'',
          userId:0,
          rating:'',
          whereDidYouLearn:'',

        };
        this.userinfo.foreignLanguage.push(newForeignLanguage); 
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
    deleteForeignLanguage(index: number){ 
      if (this.userinfo) {
        this.userinfo.foreignLanguage.splice(index, 1);
      }
    }
    deleteEducationInfo(index: number) {
      if (this.userinfo) {
        this.userinfo.educationInfo.splice(index, 1); 
      }
    }
    deleteCertificate(index: number) {
      if (this.userinfo) {
        this.userinfo.certificates.splice(index, 1); 
      }
    }
    deleteWorkExperience(index: number) { 
      if (this.userinfo) {
        this.userinfo.workExperiences.splice(index, 1); 
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
      
        this.userinfoService.UpdateUserInfoAbout(userInfoAbout).subscribe(response=>{
          this.toastrService.info(response.message);
            this.userinfo!.skills= response.data.skills!;
            this.userinfo!.userInfos!.bio= response.data.bio;
            this.userinfo!.userInfos!.salaryException= response.data.salaryException;
            localStorage.setItem('userinfo', JSON.stringify(this.userinfo));

        },
        responseError => {
          this.toastrService.error(responseError.error, 'Hata', {
    
          });
        })
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
    this.userinfoService.UpdateUserInfoApplicant(userInfoApplication).subscribe(response=>{
      this.toastrService.info(response.message);
        this.userinfo!.userInfos!.livingLocation= userInfo.livingLocation;
        this.userinfo!.userInfos!.nationality= userInfo.nationality;
        this.userinfo!.userInfos!.nationalityId= userInfo.nationalityId;
        this.userinfo!.userInfos!.phone= userInfo.phone;
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo));

    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    })
      }
   
    }
    toggledutc(eduInfo:EducationInfo[]) {
      this.isEducationEditing= !this.isEducationEditing;
      if(this.isEducationEditing==false){
        const educationInfoDto: EducationInfoDto = {
          userId:0,
          educationInfos:this.userinfo!.educationInfo

          };
    this.educationInfoService.UpdateEducationInfo(educationInfoDto).subscribe(response=>{
      this.toastrService.info(response.message);
        this.userinfo!.educationInfo= eduInfo;
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo));

    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    })
  
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
    this.userinfoService.UpdateUserInfoPersonal(userInfoPersonal).subscribe(response=>{
      this.toastrService.info(response.message);
        this.userinfo!.userInfos!.birthDate= userInfo.birthDate;
        this.userinfo!.userInfos!.birthplace= userInfo.birthplace;
        this.userinfo!.userInfos!.gender= userInfo.gender;
        this.userinfo!.userInfos!.militaryServiceInfo= userInfo.militaryServiceInfo;
        this.userinfo!.userInfos!.disabilityStatus= userInfo.disabilityStatus;
        this.userinfo!.userInfos!.smoke= userInfo.smoke;
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo));

    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    })
  
      }
    }
    toggleworkexp(workExperience:WorkExperience[]) {
      this.isWorkExperienceEditing= !this.isWorkExperienceEditing;
      if(this.isWorkExperienceEditing==false){
        const workExperienceDto: WorkExperienceDto = {
          userId:0,
          workExperience:this.userinfo!.workExperiences

          };
    this.workExperienceService.UpdateWorkExperience(workExperienceDto).subscribe(response=>{
      this.toastrService.info(response.message);
        this.userinfo!.workExperiences!= workExperience;
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo));

    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    })
  
      }
    }
  
    toggleLanguageEditing(foreignLanguages:ForeignLanguages[]){
      this.isLanguageEditing=!this.isLanguageEditing;
      if(this.isLanguageEditing==false){
        const foreignLanguageDto: ForeignLanguageDto = {
          userId:0,
          foreignLanguages:this.userinfo!.foreignLanguage 

          };
    this.foreignLanguageService.UpdateForeignLanguage(foreignLanguageDto).subscribe(response=>{
      this.toastrService.info(response.message);
        this.userinfo!.foreignLanguage= foreignLanguages;
        localStorage.setItem('userinfo', JSON.stringify( this.userinfo));
      
    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    })
  
      }
    }
    toggleCertificateEditing(certificates:Certificate[]){
      this.isCertificateEditing = !this.isCertificateEditing;
      if(this.isCertificateEditing==false){
        const certificatesDto: CertificatesDto = {
          userId:0,
          certificates:this.userinfo!.certificates

          };
    this.certificateService.UpdateCertificate(certificatesDto).subscribe(response=>{
      this.toastrService.info(response.message);
        this.userinfo!.certificates= certificates;
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
      
    },
    responseError => {
      this.toastrService.error(responseError.error, 'Hata', {

      });
    })
  
      }
    }
 setUserInfoData(userAllInfo: UserAllInfo): void {
    localStorage.setItem('userinfo', JSON.stringify(userAllInfo));  
  }
  gomain(){

    this.router.navigate([`homepage`]);
  }
  getUserInfoDataFromStorage(): UserAllInfo | null {
    const userAllInfoData = localStorage.getItem('userinfo');
    return userAllInfoData ? JSON.parse(userAllInfoData) : null;
  }
  ngOnDestroy(): void {
    localStorage.removeItem('userinfo'); 
  }
}
