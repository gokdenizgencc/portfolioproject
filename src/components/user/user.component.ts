import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { UserResponseModel } from '../../models/productResponseModel';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users:User[]=[];
  apiUrl="https://localhost:44359/api/Users/getAll";
  constructor(private httpClient:HttpClient){

  }
ngOnInit(): void {
  throw new Error('Method not implemented.');
 
}


getUsers(){
  this.httpClient.get<UserResponseModel>(this.apiUrl);
}

}
