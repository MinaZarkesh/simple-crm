import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { WitnessComponent } from './witness/witness.component';
import { WitnessDetailComponent } from './witness/witness-detail/witness-detail.component';

export const routes: Routes = [
    // { path: '', component: UserComponent },
     {  path: '', component: DashboardComponent },
    {  path: 'dashboard', component: DashboardComponent },
     {  path: 'witnesses', component: WitnessComponent },
    {  path: 'witness/:id', component: WitnessDetailComponent },
    {path: 'events', component: EventComponent},
    {path: 'events/:id', component: EventDetailComponent}
    // {  path: 'user/detail', component: UserDetailComponent },
];
