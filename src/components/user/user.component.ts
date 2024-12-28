import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { User } from '../../models/user';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { response } from 'express';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users:User[]=[];
  dataLoaded=false;
  constructor(private userService:UserService){

  }
ngOnInit(): void {
this.getUsers();
 
}
getUsers(){
this.userService.getUsers().subscribe(response=>{
  this.users=response.data
  this.dataLoaded=true;
});
}



}
