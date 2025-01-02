import { Component } from '@angular/core';
import { NaviComponent } from '../navi/navi.component';
import { ProjectComponent } from '../project/project.component';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ NaviComponent, ProjectComponent,RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
