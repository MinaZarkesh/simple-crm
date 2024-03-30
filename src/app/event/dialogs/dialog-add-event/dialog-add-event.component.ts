import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Witness } from '../../../../models/witness.class';
import { firebaseService } from '../../../firebase-services/firebase.service';
import { NgIf, NgFor, NgForOf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogContent } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../../../models/event.class';

@Component({
  selector: 'app-dialog-add-event',
  standalone: true,
  imports: [
    MatDialogActions,
    MatOption,
    NgFor,
    NgForOf,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    NgIf,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],

  templateUrl: './dialog-add-event.component.html',
  styleUrl: './dialog-add-event.component.scss',
})
export class DialogAddEventComponent {
  witnessId: string | null = '';
  eventId: string  ='temp';
  witnesses: any = this.fireService.witnesses;
  witness = new Witness();

  loading: boolean = false;
  toppings = new FormControl('');
  witnessesControl = new FormControl<Witness[] | null>(
    null,
    Validators.required
  );

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  selected = 'Zeugen auswählen';
  event = new Event();
  tempDate: any;
  tempTime: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAddEventComponent>,
    public fireService: firebaseService
  ) {}

  async addEvent() {
    this.loading = true;
    // this.witnesses = this.selected;
    let dateString = this.tempDate?.toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    let tempWitnessesId: any[] = [];
    this.witnessesControl.value?.forEach((element) => {
      tempWitnessesId.push(element.docId);
    });
    console.log('add: 2', tempWitnessesId);

    let tempEvent: Event = {
      docId: this.eventId,
      date: dateString,
      time: this.event.time,
      place: this.event.place,
      description: this.event.description,
      type: this.event.type,
      witnesses: tempWitnessesId,
    };
    console.log('addEvent: ', tempEvent);
    await this.fireService.addEvent(tempEvent);
    // await this.fireService.updateSingleEvent(this.eventId, tempEvent);
    await console.log(this.fireService.events);
    this.loading = false;
  }

  getWitnessesList() {
    let test: any;
  }
  
}
