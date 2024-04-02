import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { firebaseService } from '../firebase-services/firebase.service';
//classes
import { Witness } from '../../models/witness.class';
import { Event } from '../../models/event.class';

//dialogs
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEventComponent } from './dialogs/dialog-add-event/dialog-add-event.component';
import { DialogEditEventComponent } from './dialogs/dialog-edit-event/dialog-edit-event.component';
import { DialogDeleteEventComponent } from './dialogs/dialog-delete-event/dialog-delete-event.component';

//for html/MaterialDesign
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

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
  witnessId = '';
  witness: Witness = new Witness();
  witnesses: Witness[] = [];
  eventId = '';
  event: Event = new Event();
  events: Event[] = [];
  panelOpenState = false;

  constructor(public dialog: MatDialog, public fireService: firebaseService) {}

    /**
   * Stops the propagation of the event and prevents its default behavior.
   *
   * @param {Object} e - The event object containing the `stopPropagation` and `preventDefault` methods.
   */
  stopEvent(e: { stopPropagation: () => void; preventDefault: () => void }) {
    e.stopPropagation();
    e.preventDefault();
  }

  // timeline() {
  //   const timelineWrapper: any = document.querySelectorAll('.timeline-wrapper'),
  //     timelines: any = document.querySelectorAll('.timeline li .data');

  //   for (const time of timelines) {
  //     console.log(time);
  //     time.onclick = () => time.classList.toggle('show');
  //     console.log(timelines);
  //   }

  //   // timelineWrapper.addEventListener('mousemove', (ev: { pageX: any; })=>{
  //   //   const timeline = document.querySelector('.timeline');
  //   //  let scroll_width = 0;
  //   //   if(timeline){
  //   //      scroll_width = ev.pageX/ timelineWrapper.clientWidth * (timelineWrapper.clientWidth -timeline.clientWidth);
  //   //     //  timeline.style.left = scroll_width.toFixed(1)	+ 'px';
  //   //   }
  //   //   console.log({
  //   //     'timeline_width': scroll_width.toFixed(1)

  //   //   });
  //   // })
  // }

    /**
   * Initializes the component and performs any necessary setup.
   *
   * @return {Promise<void>} A promise that resolves when the initialization is complete.
   */
  async ngOnInit() {
    // this.timeline();
  }

    /**
   * A description of the entire function.
   *
   * @param {void} None
   * @return {Promise<void>} A Promise that resolves to void
   */
  async getEventsList() {
    this.events = await this.fireService.events;
    return this.fireService.getEventsList();
  }

    /**
   * A description of the entire function.
   *
   * @param {string} id - description of parameter
   * @return {string} description of return value
   */
  async getEventId(id: string) {
    let temp!: Event;
    temp = await this.getEventById(id);
    if (id == temp.docId) {
      return id;
    } else {
      return this.eventId;
    }
  }

    /**
   * Retrieves an event by its ID asynchronously.
   *
   * @param {string} id - The ID of the event to retrieve.
   * @return {Event | undefined} The event with the specified ID, or undefined if not found.
   */
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

    /**
   * Retrieves the name of a witness based on their ID.
   *
   * @param {string} id - The ID of the witness.
   * @return {string} The name of the witness.
   */
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

    /**
   * Opens the add event dialog.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  openAddEventDialog() {
    this.dialog.open(DialogAddEventComponent);
  }

    /**
   * Opens the edit event dialog and sets up the event data for editing.
   *
   * @param {Event} event - the event to be edited
   */
  openEditEventDialog(event: Event) {
    const dialog = this.dialog.open(DialogEditEventComponent);
    dialog.componentInstance.event = new Event(event);
    if (this.event.docId != undefined) {
      dialog.componentInstance.eventId = this.event.docId;
      dialog.componentInstance.eventWitnessesIdList = this.event.witnesses;
    }
  }

    /**
   * A description of the entire function.
   *
   * @param {Event} event - description of parameter
   * @return {void} description of return value
   */
  openDeleteEventDialog(event: Event) {
    const dialog = this.dialog.open(DialogDeleteEventComponent);
    dialog.componentInstance.event = new Event(event);
    if (this.event.docId) dialog.componentInstance.eventId = this.event.docId;
  }
}
