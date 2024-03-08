import { Component,  OnInit } from '@angular/core';
import { firebaseService } from '../firebase-services/firebase.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//classes
import { Witness } from '../../models/witness.class';
import { Statement } from '../../models/statement.class';
import { Event } from '../../models/event.class';

//dialogs
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddEventComponent } from './dialogs/dialog-add-event/dialog-add-event.component';
import { DialogEditEventComponent } from './dialogs/dialog-edit-event/dialog-edit-event.component';
import { DialogDeleteEventComponent } from './dialogs/dialog-delete-event/dialog-delete-event.component';

//for html/MaterialDesign
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
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
  // user: User | any = new User();
  // event: Event = new Event();
  // defaultEvents: Event[] = [];
  // statements: Statement[] = [];
   witness: Witness = new Witness();

  defaultWitnesses: Witness[] = [
    {
      docId: '1',
      name: 'John Doe',
      address: 'Musterstraße 1, 30657 Hannover',
      phone: '01234567890',
      role: 'Opfer',
      statements: [
        'statement_id1',
        'statement_id2',
        'statement_id3',
        'statement_id4',
      ],
    },
    {
      docId: '2',
      name: 'Jane Doe',
      address: 'Musterstraße 2, 30657 Hannover',
      phone: '01234567891',
      role: 'Beobachter',
      statements: [
        'statement_id5',
        'statement_id6',
        'statement_id7',
        'statement_id8',
      ],
    },
    {
      docId: '3',
      name: 'John Smith',
      address: 'Musterstraße 10, 30657 Hannover',
      phone: '01234567899',
      role: 'Angeklagter',
      statements: [
        'statement_id37',
        'statement_id38',
        'statement_id39',
        'statement_id40',
      ],
    },
  ];
  
  panelOpenState = false;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  
  constructor(public dialog: MatDialog, private fireService: firebaseService) {}
  
  
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
    return this.defaultWitnesses;
    // return this.userService.normalUsers;
  }

  openDialog() {
    this.dialog.open(DialogAddEventComponent);
  }
}
