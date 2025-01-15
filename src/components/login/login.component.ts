import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule,ToastrModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:FormGroup;
constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,  private router:Router){

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
login(){
  if(this.loginForm.valid){
    console.log(this.loginForm.value);
    let loginModel=Object.assign({},this.loginForm.value)

    this.authService.login(loginModel).subscribe(result=>{
      this.toastrService.success(result.message)
      localStorage.setItem("token",result.data.token.toString())
      let decoded: any=this.authService.decodejwt();




      this.router.navigate(["homepage"]);
   
    },responseError=>{
      this.toastrService.error(responseError.error.message)
    })
  }

}

}
