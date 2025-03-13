import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

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
  searchTerm = '';
  searchResults: any[] = [];
  showDropdown = false;
  private searchTerms = new Subject<string>();
  constructor(private userService:UserService,private authService:AuthService,private router:Router,private httpClient:HttpClient){
  
    }
  ngOnInit():void{
    this.searchTerms.pipe(
      // Her tuş vuruşundan sonra 300ms bekle
      debounceTime(300),
      
      // Aynı terimi tekrar aramayı önle
      distinctUntilChanged(),
      
      // Her terim değişikliğinde API çağrısı yap
      switchMap((term: string) => {
        if (term.length < 2) {
          this.showDropdown = false;
          return [];
        }
        this.showDropdown = true;
        // API'nize uygun URL'yi kullanın
        return this.httpClient.get<any[]>(`/api/users/search?nickname=${term}`);
      })
    ).subscribe(results => {
      this.searchResults = results;
    });
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
  search(term: string): void {
    this.searchTerm = term;
    this.searchTerms.next(term);
  }
  

  navigateToProfile(username: string): void {
    this.router.navigate([`/${username}`]);
    this.searchTerm = '';
    this.showDropdown = false;
  }
  route(){
    this.router.navigate(["login"]); 
  }
  islogin(){
    this.isUserLoggedIn= this.authService.isAuthenticated();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']).then(() => {

      window.location.reload();
    });
  }
}
