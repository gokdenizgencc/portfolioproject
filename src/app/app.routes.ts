import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { UserAddComponent } from '../components/user-add/user-add.component';
import { LoginComponent } from '../components/login/login.component';
import { loginGuard } from '../guards/login.guard';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { FirstpageComponent } from '../components/firstpage/firstpage.component';
import { NavinComponent } from '../components/navin/navin.component';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { BlogComponent } from '../components/blog/blog.component';
import { RegisterComponent } from '../components/register/register.component';
import { NaviComponent } from '../components/navi/navi.component';
import { UserinfoComponent } from '../components/userinfo/userinfo.component';
import { AddblogpageComponent } from '../components/addblogpage/addblogpage.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {
      path: '',
      component: NaviComponent, 
      children: [
        {path: "", component: FirstpageComponent},  // Kök yol için varsayılan rota
      ]
    },
    {
      path: '',
      component: NavinComponent, 
      children: [

        {path: 'homepage', component: HomepageComponent, canActivate: [loginGuard]},
        {path: 'users/project/:userId', component: UserComponent, canActivate: [loginGuard]},
        {path: 'users', component: UserComponent, canActivate: [loginGuard]},
        {path: 'blogs/add', component: UserAddComponent, canActivate: [loginGuard]},
        {path: 'blogs', component: BlogsComponent, canActivate: [loginGuard]},
        {path: 'projects', component: BlogsComponent, canActivate: [loginGuard]},
        {path: 'blogs/:id', component: BlogComponent, canActivate: [loginGuard]},
        {path: 'projects/:id', component: BlogComponent, canActivate: [loginGuard]},
        {path: 'userinfo', component: UserinfoComponent, canActivate: [loginGuard]},
        {path: 'addblog', component: AddblogpageComponent , canActivate: [loginGuard]},
      ]
    },
    {path: '**', redirectTo: 'login'}
];
