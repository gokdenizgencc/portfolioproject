import { Routes } from '@angular/router';
import { UserComponent } from '../components/user/user.component';
import { UserAddComponent } from '../components/user-add/user-add.component';

export const routes: Routes = [
    {path:"",pathMatch:"full",component:UserComponent},
    {path:"users",component:UserComponent},
    {path:'users/project/:userId',component:UserComponent},
    {path:'blogs/add',component:UserAddComponent},
];
