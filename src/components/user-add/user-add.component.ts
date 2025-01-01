import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  blogAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private blogservice:BlogService,private toasterservice:ToastrService ){

  }
  ngOnInit():void{
    this.createUserAddForm();
  }
  createUserAddForm(){
    this.blogAddForm=this.formBuilder.group({
      userId:["",Validators.required],
      title:["",Validators.required],
      conte:["",Validators.required],
      publishedAt:[""],
    })
  }
  add(){
    if(this.blogAddForm.valid){
      let blogModel= Object.assign({},this.blogAddForm.value)
      const today = new Date();
      blogModel.publishedAt = today.toISOString().split('T')[0]; 
      this.blogservice.add(blogModel).subscribe(data=>{
        console.log(data)
        this.toasterservice.success(data.message,"Basarili")
      },responseError=>{
        console.log(responseError)
        this.toasterservice.error(responseError.error)
      })

    }
    else{
      this.toasterservice.error("Formumuz eksik","Dikkat")
    }

  }
}
