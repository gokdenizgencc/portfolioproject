import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule,],
  templateUrl: './navin.component.html',
  styleUrl: './navin.component.css'
})
export class NavinComponent {
  isUserLoggedIn: boolean = false;
  user:User
  id:number;
  constructor(private userService:UserService,private authService:AuthService,private router:Router){
  
    }
  ngOnInit():void{
    this.islogin()
    this.getid()

  }
  getid(){
    const idString = this.authService.getIntFromLocalStorage("nameIdentifier", 0);
    this.id = idString !== null ? parseInt(idString, 10) : 0;
  }
  getuser(){
    this.userService.getUser().subscribe(response=>{
      this.user=response.data;


    }
  );
 
  }
  route(){
    this.router.navigate(["login"]); 
  }
  islogin(){
    this.isUserLoggedIn= this.authService.isAuthenticated();
  }
}
