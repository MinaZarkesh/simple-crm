import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';

export const routes: Routes = [
    // { path: '', component: UserComponent },
     {  path: '', component: DashboardComponent },
    {  path: 'dashboard', component: DashboardComponent },
     {  path: 'users', component: UserComponent },
    {  path: 'users/:id', component: UserDetailComponent },
    {path: 'events', component: EventComponent}
    // {  path: 'user/detail', component: UserDetailComponent },
];
