import { Component, OnInit } from '@angular/core';
import { firebaseService } from '../firebase-services/firebase.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

//classes
import { Witness } from '../../models/witness.class';
import { Statement } from '../../models/statement.class';
import { Event } from '../../models/event.class';

//dialogs
import { MatDialog } from '@angular/material/dialog';
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
    NgFor,
    RouterLink,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDividerModule,
  ],

  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  // TShzkalm0x2MII9j2b7A
  witnessId = '';
  witness: Witness = new Witness();
  witnesses: Witness[] = [];
  // EyKrTJv0aUKAA4fERqcP
  eventId = 'EyKrTJv0aUKAA4fERqcP';
  event: Event = new Event();
  events: Event[] = [];
  panelOpenState = false;

  constructor(public dialog: MatDialog, public fireService: firebaseService) {}
  stopEvent(e: { stopPropagation: () => void; preventDefault: () => void }) {
    e.stopPropagation();
    e.preventDefault();
  }

  timeline() {
    const timelineWrapper: any = document.querySelectorAll('.timeline-wrapper'),
      timelines: any = document.querySelectorAll('.timeline li .data');

    for (const time of timelines) {
      console.log(time);
      time.onclick = () => time.classList.toggle('show');
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

  async ngOnInit() {
    this.timeline();
  }

  async getEventsList() {
    this.events = await this.fireService.events;
    return this.fireService.getEventsList();
  }

  async getEventId(id: string) {
    let temp!: Event;
    temp = await this.getEventById(id);
    if (id == temp.docId) {
      return id;
    } else {
      return this.eventId;
    }
  }

  async getEventById(id: string) {
    let currentEvent: Event | undefined = undefined;
    let temp: Event | undefined;
    currentEvent = await this.fireService.events.find((element) => {
      if (element.docId == id) {
        temp = new Event(element);
      }
      return temp;
    });

    if (currentEvent != undefined) {
      return currentEvent;
    } else {
      return this.event;
    }
  }

  getWitnessNamebyWitnessId(id: string): string {
    let currentWitness: Witness | undefined = undefined;
    //temp is first undefined, var for .find
    let temp: Witness | undefined = undefined;

    //if element.docId == id, temp is element in form of Witness
    // rewrite temp with found element, if nothing found temp is still undefined
    currentWitness = this.fireService.witnesses.find((element) => {
      if (element.docId == id) {
        temp = new Witness(element);
      }
      return temp;
    });

    //if currentWitness is not undefined return it, else return dummy Data
    if (currentWitness != undefined) {
      return currentWitness.name;
    } else {
      return this.witness.name;
    }
  }

  openAddEventDialog() {
    this.dialog.open(DialogAddEventComponent);
  }

  openEditEventDialog(event: Event) {
    const dialog = this.dialog.open(DialogEditEventComponent);
    dialog.componentInstance.event = new Event(event);
    if (this.event.docId != undefined) {
      dialog.componentInstance.eventId = this.event.docId;
      dialog.componentInstance.eventWitnessesIdList = this.event.witnesses;
    }
  }

  openDeleteEventDialog(event: Event) {
    const dialog = this.dialog.open(DialogDeleteEventComponent);
    // this.event = this.fireService.currentEvent;
    dialog.componentInstance.event = new Event(event);
    if (this.event.docId) {
      dialog.componentInstance.eventId = this.event.docId;
    }
  }
}
