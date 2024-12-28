import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaviComponent } from "../components/navi/navi.component";
import { ProjectComponent } from "../components/project/project.component";
import { UserComponent } from "../components/user/user.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NaviComponent, ProjectComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'portfolioproject';
  
}
