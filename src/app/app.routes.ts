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

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "first", component: FirstpageComponent},
    {path: "register", component: RegisterComponent},
    {
      path: '',
      component: NavinComponent, 
      children: [
        {path: '', component: FirstpageComponent},  // Kök yol için varsayılan rota
        {path: 'homepage', component: HomepageComponent, canActivate: [loginGuard]},
        {path: 'users/project/:userId', component: UserComponent, canActivate: [loginGuard]},
        {path: 'users', component: UserComponent, canActivate: [loginGuard]},
        {path: 'blogs/add', component: UserAddComponent, canActivate: [loginGuard]},
        {path: 'blogs', component: BlogsComponent, canActivate: [loginGuard]},
        {path: 'blogs/:id', component: BlogComponent, canActivate: [loginGuard]},
      ]
    },
    {path: '**', redirectTo: '/first'}  // Tanımlanmayan URL'ler için yönlendirme (opsiyonel)
];
