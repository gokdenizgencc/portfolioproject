import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { UserAddComponent } from '../components/user-add/user-add.component';
import { LoginComponent } from '../components/login/login.component';
import { loginGuard } from '../guards/login.guard';
import { HomepageComponent } from '../components/homepage/homepage.component';

export const routes: Routes = [
    
    {path:"",pathMatch:"full",component:LoginComponent},
    {path:"login",component:LoginComponent},
    {
      path: '',
      component: HomepageComponent, // Navbar ve yan menü içeren layout
      children: [
        {path:'users/project/:userId',component:UserComponent},
        // Diğer içerikli sayfalar
        {path:"users",component:UserComponent},
        {path:'blogs/add',component:UserAddComponent,canActivate:[loginGuard]},
      ],
    },
];
