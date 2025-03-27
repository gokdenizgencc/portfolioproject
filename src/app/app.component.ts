import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaviComponent } from "../components/navi/navi.component";
import { ProjectComponent } from "../components/project/project.component";
import { UserComponent } from '../components/user/user.component';
import { LoginComponent } from "../components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'portfolioproject';

}
