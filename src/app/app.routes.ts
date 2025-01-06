import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { UserAddComponent } from '../components/user-add/user-add.component';
import { LoginComponent } from '../components/login/login.component';
import { loginGuard } from '../guards/login.guard';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { FirstpageComponent } from '../components/firstpage/firstpage.component';
import { NavinComponent } from '../components/navin/navin.component';
import { NaviComponent } from '../components/navi/navi.component';

export const routes: Routes = [
    

    {path:"login",component:LoginComponent},
    {path:"first",component:FirstpageComponent},
    {
      path: '',
      component: NaviComponent, // Navbar ve yan menü içeren layout
      children: [
     
        {path:"",component:FirstpageComponent},
      ],
    },
    {
      path: '',
      component: NavinComponent, // Navbar ve yan menü içeren layout
      children: [
        {path:'homepage',component:HomepageComponent},
        {path:'users/project/:userId',component:UserComponent},
        {path:"users",component:UserComponent},
        {path:'blogs/add',component:UserAddComponent,canActivate:[loginGuard]},
      ],
    },
];
