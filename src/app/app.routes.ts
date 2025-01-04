import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { UserAddComponent } from '../components/user-add/user-add.component';
import { LoginComponent } from '../components/login/login.component';
import { loginGuard } from '../guards/login.guard';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { FirstpageComponent } from '../components/firstpage/firstpage.component';

export const routes: Routes = [
    

    {path:"login",component:LoginComponent},
    {path:"first",component:FirstpageComponent},
    {
      path: '',
      component: HomepageComponent, // Navbar ve yan menü içeren layout
      children: [
        {path:'users/project/:userId',component:UserComponent},
        // Diğer içerikli sayfalar
        {path:"users",component:UserComponent},
        {path:'blogs/add',component:UserAddComponent,canActivate:[loginGuard]},
        {path:"",component:FirstpageComponent},
      ],
    },
];
