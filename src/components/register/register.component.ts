import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule,ToastrModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.createRegisterForm();
    this.authService.checklogin();
  }
  
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      nickName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  
  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
  
      this.authService.register(registerModel).subscribe(
        result => {
          this.toastrService.success(result.message);
          localStorage.setItem("token", result.data.token.toString());
          this.authService.decodejwt();
          this.router.navigate(["homepage"]);
        },
        responseError => {
          this.toastrService.error(responseError.error.message);
        }
      );
    }
  }
  gotologin(){
    this.router.navigate(["login"]);
  }
}
