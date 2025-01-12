import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule,],
  templateUrl: './navin.component.html',
  styleUrl: './navin.component.css'
})
export class NavinComponent {
  user:User
  constructor(private userService:UserService){
  
    }
  ngOnInit():void{
    this.getuser();
  }

  getuser(){
    this.userService.getUser(1).subscribe(response=>{
      this.user=response.data;


    }
  );
  }
  
}
