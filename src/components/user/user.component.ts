import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { User } from '../../models/user';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { response } from 'express';
import { ActivatedRoute } from '@angular/router';
import { VatAddedPipe } from '../../app/pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from '../../app/pipes/filter-pipe.pipe';
import{ToastrModule, ToastrService} from "ngx-toastr";
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,HttpClientModule,VatAddedPipe, FormsModule,FilterPipePipe,ToastrModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
addToCart(user: User) {

  this.toastrService.success("Sepete eklendi",user.fullName)
  this.cartService.addToCart(user);
}
  users:User[]=[];
  dataLoaded=false;
  filterText="";
  constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private cartService:CartService){

  }
ngOnInit(): void {
  this.activatedRoute.params.subscribe(params=>{
    if(params["userId"]){
      this.getUsersByCategory(params["userId"])

    }
    else{
      this.getUsers()
    }
  })
 
}
getUsers(){
this.userService.getUsers().subscribe(response=>{
  this.users=response.data
  this.dataLoaded=true;
});
}

getUsersByCategory(categoryId:number){
  this.userService.getUsersByCategory(categoryId).subscribe(response=>{
    this.users=response.data
    this.dataLoaded=true;
  })
}



}
