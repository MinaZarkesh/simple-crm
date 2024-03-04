import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    // { path: '', component: UserComponent },
     {  path: '', component: DashboardComponent },
    {  path: 'dashboard', component: DashboardComponent },
     {  path: 'user', component: UserComponent },
    {  path: 'user/:id', component: UserDetailComponent }
    // {  path: 'user/detail', component: UserDetailComponent },
];
