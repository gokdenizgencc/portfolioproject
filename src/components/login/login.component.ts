import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserAllInfo } from '../../models/userAllInfo';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule,ToastrModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup;
isButtonDisabled = false;
isLoading = false;
userinfo:UserAllInfo;
  dataLoaded=false;
constructor(private userService:UserService,private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,  private router:Router){

}
ngOnInit():void{
  this.createLoginForm();
  this.authService.checklogin();
}
createLoginForm(){
this.loginForm=this.formBuilder.group({
  email:["",Validators.required],
  password:["",Validators.required]
})
}
gotoregister(){
  this.router.navigate(["register"]);
}
login(){
  if(this.loginForm.valid){

  
    if (this.isButtonDisabled) {
      return; 
    }

   
    let loginModel = Object.assign({}, this.loginForm.value);

 
    this.isButtonDisabled = true;
    this.isLoading = true;
   
    this.authService.login(loginModel).subscribe(result => {
      this.userinfo = result.data;
      this.dataLoaded = true;
      localStorage.setItem('userinfo', JSON.stringify(this.userinfo)); 
      this.toastrService.success(result.message);


      this.router.navigate(["homepage"]);
    }, responseError => {
      this.toastrService.error(responseError.error.message);
    });

  
    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 5000);
  }
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
        localStorage.setItem('userinfo', JSON.stringify(this.userinfo)); 
      },
      (responseError) => {
        this.toastrService.error(responseError.error.Message, 'Hata', {});
      }
    );
  }
}

}
