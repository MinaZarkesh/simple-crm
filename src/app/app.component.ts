import { Component, NgModule } from '@angular/core';
import { RouterLinkActive, RouterOutlet, RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgIf } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {  MzdTimelineModule } from 'ngx-mzd-timeline';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  NgIf,
    RouterOutlet, RouterLink, RouterLinkActive,
    MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})




export class AppComponent {
  title = 'simple-icm';
  showFiller = false;
}
