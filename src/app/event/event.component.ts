import { Component,  OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { UserListService } from '../firebase-services/user-list.service';
import { DialogAddEventComponent } from './dialogs/dialog-add-event/dialog-add-event.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    NgFor,
    RouterLink,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    CommonModule
  ],

  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})


export class EventComponent implements OnInit {
  // noteList: User[] = [];
  user: User | any = new User();
  defaultUsers: User[] = [
    // {
    //   docId: 'PRgrM5ZikZoNXdMqG8hE',
    //   name: 'Leeroy Jethro Gibbs',
    //   email: 'ermittlerA@polizei.de',
    //   capacity: true,
    //   trails: ['Spur 1', 'Spur 2', 'Spur 3'],
    // },
    // {
    //   docId: 'RCXV4JlhIqMcdg7mExGF',
    //   name: 'Timothy McGee',
    //   email: 'ermittlerB@polizei.de',
    //   capacity: true,
    //   trails: ['Spur 1', 'Spur 2'],
    // },
    // {
    //   docId: 'JFF0K4vmvsfFrNnoVJUC',
    //   name: 'Abby Scuito',
    //   email: 'ermittlerC@polizei.de',
    //   capacity: false,
    //   trails: ['Spur 3'],
    // },
  ];
  
  panelOpenState = false;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  
  constructor(public dialog: MatDialog, private userService: UserListService) {}
  
  
  timeline(){
    const timelineWrapper: any = document.querySelectorAll('.timeline-wrapper'),
    timelines: any = document.querySelectorAll('.timeline li .data');
    
    for(const time of timelines){
      console.log(time);
      time.onclick = ()=>time.classList.toggle('show');
      console.log(timelines);
      }
  
      // timelineWrapper.addEventListener('mousemove', (ev: { pageX: any; })=>{
      //   const timeline = document.querySelector('.timeline');
      //  let scroll_width = 0;
      //   if(timeline){
      //      scroll_width = ev.pageX/ timelineWrapper.clientWidth * (timelineWrapper.clientWidth -timeline.clientWidth);
      //     //  timeline.style.left = scroll_width.toFixed(1)	+ 'px';
      //   }
      //   console.log({
      //     'timeline_width': scroll_width.toFixed(1)
      
      //   });
      // })
  }

  

  ngOnInit(): void {
   
    console.log('ngOnInit: ');
     this.timeline();
    
  }


  getList() {
    return this.defaultUsers;
    // return this.userService.normalUsers;
  }

  openDialog() {
    this.dialog.open(DialogAddEventComponent);
  }
}
