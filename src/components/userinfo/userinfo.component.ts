import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserAllInfo } from '../../models/userAllInfo';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserinfoService } from '../../services/userinfo.service';
import { UserInfoApplicantDto } from '../../models/userInfoApplicantDto';
import { UserInfos } from '../../models/userInfo';
import { UserInfoPersonalDto } from '../../models/userInfoPersonalDto';
import { Skill } from '../../models/skill';
import { UserInfoAboutDto } from '../../models/userInfoAboutDto';
import { EducationInfo } from '../../models/educationInfo';
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
import { UserSearchResultDto } from '../../models/UserSearchResultDto';
import { MatDialogModule } from '@angular/material/dialog';
import { Location } from '@angular/common';
@Component({
  selector: 'app-userinfo',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.css'
})
export class UserinfoComponent {
   userinfo:UserAllInfo| null = null;
   userinfof:UserAllInfo| null = null;;
   username: string;
   isOwnPage: boolean = false;
   otherinfo: boolean = false;
   dataLoaded=false;
    id:number;
    isEditing = false; 
    isInfo=false;
    isEducationEditing=false;
    isWorkExperienceEditing=false;
    isPersonalInfoEditing: boolean = false;
    isLanguageEditing=false;
    isCertificateEditing = false;
    backupUserInfo: UserInfos;
    backupEducationInfo: EducationInfo[] = [];
    backupUserInfoD: UserInfoAboutDto;
    backupPersonalInfo:UserInfos;
    backupWorkExperiences: WorkExperience[] | null = null;
    backupForeignLanguages: ForeignLanguages[] | null = null;
    backupCertificates: Certificate[] | null = null;
     private userSearchResultDto: UserSearchResultDto | null = null;
      constructor(private userService:UserService,private location: Location,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,
        private router:Router,private userinfoService:UserinfoService,private educationInfoService:EducationInfoService,
        private certificateService:CertificateService,private workExperienceService:WorkExperienceService,
        private foreignLanguageService:ForeignLanguageService,private route: ActivatedRoute){
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
       if (this.username && this.username === this.userinfof?.username) {
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
          this.otherinfo=true;
        }
      }
  
      else if (this.userSearchResultDto = this.userService.getUserAllInfoDataOther()) {
        this.getinfoother();
        this.otherinfo=true;
      }
  
    
  
      else if (this.username && this.userinfof && this.username !== this.userinfof.username) {
        const savedOtherInfo = this.getUserInfoDataFromStorageOt();
        if (savedOtherInfo && savedOtherInfo.username === this.username) {
          this.userinfo = savedOtherInfo;
          this.dataLoaded = true;
          this.otherinfo=true;
        }
  
        else {
          this.getinfoByName(this.username);
          this.otherinfo=true;
        }
      }
  
      else if (this.username) {
        this.getinfoByName(this.username);
        this.otherinfo=true;
      }
      
    }
    getUserInfoDataFromStorageOt(): UserAllInfo | null {
      const userAllInfoData = localStorage.getItem('userinfoo');
      return userAllInfoData ? JSON.parse(userAllInfoData) : null;
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
      if (!this.isEditing) {
        this.backupUserInfoD = {
          userInfoId:this.userinfo!.userInfos.userInfoId,
          bio: this.userinfo?.userInfos.bio || '',
          salaryException: this.userinfo?.userInfos.salaryException?.toString() || '',
          skills: this.userinfo?.skills ? [...this.userinfo.skills] : [],
          fullName:this.userinfo?.userInfos.fullName,
          profession:this.userinfo?.userInfos.profession
        };
      } else {
 
        const userInfoAbout: UserInfoAboutDto = {
          userInfoId:this.userinfo!.userInfos.userInfoId,
          bio: this.userinfo?.userInfos.bio,
          salaryException: this.userinfo?.userInfos.salaryException?.toString(),
          skills: this.userinfo?.skills,
          profession:this.userinfo?.userInfos.profession,
          fullName:this.userinfo?.userInfos.fullName
        };
    
        this.userinfoService.UpdateUserInfoAbout(userInfoAbout).subscribe(
          response => {
            this.toastrService.info(response.message);
            this.userinfo!.skills = response.data.skills!;
            this.userinfo!.userInfos!.bio = response.data.bio;
            this.userinfo!.userInfos!.salaryException = response.data.salaryException;
            this.userinfo!.userInfos.profession=response.data.profession;
            this.userinfo!.userInfos.fullName=response.data.fullName;
            localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
          },
          responseError => {
            this.toastrService.error(responseError.error, 'Hata');
            

            this.restoreBackupUserInfo();
          }
        );
      }
    
      this.isEditing = !this.isEditing;
    }
    
    cancelEditt() {
      this.restoreBackupUserInfo();
      this.isEditing = false;
    }
    restoreBackupUserInfo() {
      if (this.backupUserInfoD) {
        this.userinfo!.userInfos!.bio = this.backupUserInfoD.bio;
        this.userinfo!.userInfos!.salaryException = this.backupUserInfoD.salaryException;
        this.userinfo!.skills = [...this.backupUserInfoD.skills!];
        this.userinfo!.userInfos.fullName=this.backupUserInfoD.fullName;
        this.userinfo!.userInfos.profession=this.backupUserInfoD.profession;
      }
    }
    
    // Vazgeç butonu için
   
    
    toggleEditinfo(userInfo: UserInfos) {
      if (!this.isInfo) {

        this.backupUserInfo = { ...userInfo };
        
      } else {

        const userInfoApplication: UserInfoApplicantDto = {
          userInfoId:userInfo.userInfoId,
          livingLocation: userInfo.livingLocation,
          nationality: userInfo.nationality,
          nationalityId: userInfo.nationalityId?.toString(),
          phone: userInfo.phone?.toString()
        };
    
        this.userinfoService.UpdateUserInfoApplicant(userInfoApplication).subscribe(
          response => {
            this.toastrService.info(response.message);
            
            this.userinfo!.userInfos!.livingLocation = userInfo.livingLocation;
            this.userinfo!.userInfos!.nationality = userInfo.nationality;
            this.userinfo!.userInfos!.nationalityId = userInfo.nationalityId?.toString();
            this.userinfo!.userInfos!.phone = userInfo.phone?.toString();
            localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
          },
          responseError => {
            this.toastrService.error(responseError.error.message, 'Hata');
            this.userinfo!.userInfos!.livingLocation = this.backupUserInfo.livingLocation;
            this.userinfo!.userInfos!.nationality = this.backupUserInfo.nationality;
            this.userinfo!.userInfos!.nationalityId = this.backupUserInfo.nationalityId;
            this.userinfo!.userInfos!.phone = this.backupUserInfo.phone;
          }
        );
      }
      this.isInfo = !this.isInfo;
    }
    
    cancelEdit() {
      // Kullanıcı "Vazgeç" butonuna basarsa, eski veriye geri döneriz
      this.userinfo!.userInfos!.livingLocation = this.backupUserInfo.livingLocation;
      this.userinfo!.userInfos!.nationality = this.backupUserInfo.nationality;
      this.userinfo!.userInfos!.nationalityId = this.backupUserInfo.nationalityId;
      this.userinfo!.userInfos!.phone = this.backupUserInfo.phone;
      this.isInfo = false;
    }
    
    toggledutc(eduInfo: EducationInfo[]) {
      if (!this.isEducationEditing) {
   
        this.backupEducationInfo = JSON.parse(JSON.stringify(eduInfo)); // Derin kopyalama
      } else {
        // Kaydetme işlemi
        const educationInfoDto: EducationInfoDto = {
          userId: 0,
          educationInfos: this.userinfo!.educationInfo
        };
    
        this.educationInfoService.UpdateEducationInfo(educationInfoDto).subscribe(
          response => {
            this.toastrService.info(response.message);
            this.userinfo!.educationInfo = eduInfo;
            localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
          },
          responseError => {
            this.toastrService.error(responseError.error, 'Hata');
            
            
            this.restoreBackupEducation();
          }
        );
      }
      this.isEducationEditing = !this.isEducationEditing;
    }
    
    // Eski eğitim bilgilerini geri yükleme
    restoreBackupEducation() {
      this.userinfo!.educationInfo = JSON.parse(JSON.stringify(this.backupEducationInfo)); 
  
    }
    
    // Vazgeç butonu için
    cancelEducationEdit() {
      this.restoreBackupEducation();
      this.isEducationEditing = false;
    }
    
    toggleEditPersonalInfo(userInfo: UserInfos) {
      if (!this.isPersonalInfoEditing) {

        this.backupPersonalInfo = {
          smoke: userInfo.smoke,
          birthDate: userInfo.birthDate,
          birthplace: userInfo.birthplace,
          disabilityStatus: userInfo.disabilityStatus,
          gender: userInfo.gender,
          militaryServiceInfo: userInfo.militaryServiceInfo,
          userInfoId:userInfo.userInfoId
        };
      } else {

        const userInfoPersonal: UserInfoPersonalDto = {
          userInfoId:userInfo.userInfoId,
          smoke: userInfo.smoke,
          birthDate: userInfo.birthDate,
          birthPlace: userInfo.birthplace,
          disabilityStatus: userInfo.disabilityStatus,
          gender: userInfo.gender,
          militaryServiceInfo: userInfo.militaryServiceInfo,
        };
    
        this.userinfoService.UpdateUserInfoPersonal(userInfoPersonal).subscribe(
          response => {
            this.toastrService.info(response.message);
            this.userinfo!.userInfos!.birthDate = userInfo.birthDate;
            this.userinfo!.userInfos!.birthplace = userInfo.birthplace;
            this.userinfo!.userInfos!.gender = userInfo.gender;
            this.userinfo!.userInfos!.militaryServiceInfo = userInfo.militaryServiceInfo;
            this.userinfo!.userInfos!.disabilityStatus = userInfo.disabilityStatus;
            this.userinfo!.userInfos!.smoke = userInfo.smoke;
            localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
          },
          responseError => {
            this.toastrService.error(responseError.error, 'Hata');
            
            // Hata olursa eski verileri geri yükle
            this.restoreBackupPersonalInfo();
          }
        );
      }
    
      this.isPersonalInfoEditing = !this.isPersonalInfoEditing;
    }
    
    // Eski kişisel bilgileri geri yükleme fonksiyonu
    restoreBackupPersonalInfo() {
      if (this.backupPersonalInfo) {
        this.userinfo!.userInfos!.birthDate = this.backupPersonalInfo.birthDate;
        this.userinfo!.userInfos!.birthplace = this.backupPersonalInfo.birthplace;
        this.userinfo!.userInfos!.gender = this.backupPersonalInfo.gender;
        this.userinfo!.userInfos!.militaryServiceInfo = this.backupPersonalInfo.militaryServiceInfo;
        this.userinfo!.userInfos!.disabilityStatus = this.backupPersonalInfo.disabilityStatus;
        this.userinfo!.userInfos!.smoke = this.backupPersonalInfo.smoke;
      }
    }
    
    // "Vazgeç" butonu için
    cancelEditPersonalInfo() {
      this.restoreBackupPersonalInfo();
      this.isPersonalInfoEditing = false;
    }
    
    toggleworkexp(workExperience: WorkExperience[]) {
      if (!this.isWorkExperienceEditing) {
        // Düzenleme moduna girerken mevcut verileri yedekle
        this.backupWorkExperiences = JSON.parse(JSON.stringify(this.userinfo!.workExperiences));
      } else {
        // Kaydetme işlemi
        const workExperienceDto: WorkExperienceDto = {
          userId: 0,
          workExperience: this.userinfo!.workExperiences
        };
    
        this.workExperienceService.UpdateWorkExperience(workExperienceDto).subscribe(
          response => {
            this.toastrService.info(response.message);
            this.userinfo!.workExperiences = workExperience;
            localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
          },
          responseError => {
            this.toastrService.error(responseError.error, 'Hata');
    
            // Hata olursa eski verileri geri yükle
            this.restoreBackupWorkExperiences();
          }
        );
      }
    
      this.isWorkExperienceEditing = !this.isWorkExperienceEditing;
    }
    
    // Eski iş deneyimlerini geri yükleme fonksiyonu
    restoreBackupWorkExperiences() {
      if (this.backupWorkExperiences) {
        this.userinfo!.workExperiences = JSON.parse(JSON.stringify(this.backupWorkExperiences));
      }
    }
    
    // "Vazgeç" butonu için
    cancelEditWorkExperience() {
      this.restoreBackupWorkExperiences();
      this.isWorkExperienceEditing = false;
    }
    
  
    toggleLanguageEditing(foreignLanguages: ForeignLanguages[]) {
      if (!this.isLanguageEditing) {
        // Düzenleme moduna girerken mevcut verileri yedekle
        this.backupForeignLanguages = JSON.parse(JSON.stringify(this.userinfo!.foreignLanguage));
      } else {
        // Kaydetme işlemi
        const foreignLanguageDto: ForeignLanguageDto = {
          userId: 0,
          foreignLanguages: this.userinfo!.foreignLanguage
        };
    
        this.foreignLanguageService.UpdateForeignLanguage(foreignLanguageDto).subscribe(
          response => {
            this.toastrService.info(response.message);
            this.userinfo!.foreignLanguage = foreignLanguages;
            localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
          },
          responseError => {
            this.toastrService.error(responseError.error, 'Hata');
    
            // Hata olursa eski verileri geri yükle
            this.restoreBackupForeignLanguages();
          }
        );
      }
    
      this.isLanguageEditing = !this.isLanguageEditing;
    }
    
    // Eski yabancı dilleri geri yükleme fonksiyonu
    restoreBackupForeignLanguages() {
      if (this.backupForeignLanguages) {
        this.userinfo!.foreignLanguage = JSON.parse(JSON.stringify(this.backupForeignLanguages));
      }
    }
    
    // "Vazgeç" butonu için
    cancelEditForeignLanguages() {
      this.restoreBackupForeignLanguages();
      this.isLanguageEditing = false;
    }
    
    toggleCertificateEditing(certificates: Certificate[]) {
      if (!this.isCertificateEditing) {
       
        this.backupCertificates = JSON.parse(JSON.stringify(this.userinfo!.certificates));
      } else {
       
        const certificatesDto: CertificatesDto = {
          userId: 0,
          certificates: this.userinfo!.certificates
        };
    
        this.certificateService.UpdateCertificate(certificatesDto).subscribe(
          response => {
            this.toastrService.info(response.message);
            this.userinfo!.certificates = certificates;
            localStorage.setItem('userinfo', JSON.stringify(this.userinfo));
          },
          responseError => {
            this.toastrService.error(responseError.error, 'Hata');
    
            // Hata olursa eski verileri geri yükle
            this.restoreBackupCertificates();
          }
        );
      }
    
      this.isCertificateEditing = !this.isCertificateEditing;
    }
    
    
    restoreBackupCertificates() {
      if (this.backupCertificates) {
        this.userinfo!.certificates = JSON.parse(JSON.stringify(this.backupCertificates));
      }
    }
    
  
    cancelEditCertificates() {
      this.restoreBackupCertificates();
      this.isCertificateEditing = false;
    }
    
 setUserInfoData(userAllInfo: UserAllInfo): void {
    localStorage.setItem('userinfo', JSON.stringify(userAllInfo));  
  }
  gomain(){
    this.location.back();
  }
  getUserInfoDataFromStorage(): UserAllInfo | null {
    const userAllInfoData = localStorage.getItem('userinfo');
    return userAllInfoData ? JSON.parse(userAllInfoData) : null;
  }
  ngOnDestroy(): void {
    localStorage.removeItem('userinfoo'); 
  }
}
