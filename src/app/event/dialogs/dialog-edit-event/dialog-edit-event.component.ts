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
  selector: 'app-dialog-edit-event',
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

  templateUrl: './dialog-edit-event.component.html',
  styleUrl: './dialog-edit-event.component.scss',
})
export class DialogEditEventComponent implements OnInit {
  witnessId: string | null = '';
  eventId = 'temp';
  eventWitnesses!: Witness[];
  eventWitnessesIdList!: string[];
  witness = new Witness();

  loading: boolean = false;
  toppings = new FormControl('');
  witnessesControl = new FormControl<Witness[] | null>(
    null,
    Validators.required
  );

  selected = 'Zeugen auswählen';
  event!: Event;
  tempDate: any;
  tempTime: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditEventComponent>,
    public fireService: firebaseService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.event.docId) {
      this.eventId = this.event.docId;
    }
    this.tempDate = this.changeDateformat();
    this.getWitnessesListbyEventId();
    this.witnessesControl.setValue(this.eventWitnesses);
  }

  async editEvent() {
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
    console.log('add: 2', tempWitnessesId, this.eventId);

    let tempEvent: Event = {
      docId: this.eventId,
      date: dateString,
      time: this.event.time,
      place: this.event.place,
      description: this.event.description,
      type: this.event.type,
      witnesses: tempWitnessesId,
    };

    // console.log('addEvent: ', tempEvent);
    // await this.fireService.addEvent(tempEvent);
    await this.fireService.updateSingleEvent(this.eventId, tempEvent);
    console.log(tempEvent);
    this.loading = false;
    this.dialogRef.close();
  }

  getWitnessesListbyEventId() {
    let tempWitnesses = this.event.witnesses;
    console.log('getWitness: ', this.event.docId, tempWitnesses);
    this.eventWitnesses = [];
    tempWitnesses.forEach((id) => {
      this.fireService.witnesses.find((element) => {
        if (element.docId == id) {
          this.eventWitnesses.push(element);
        }
      });
    });
  }

  changeDateformat() {
    let test = this.event.date;
    let getMonth = test.split('.')[1];
    let getDate = test.split('.')[0];
    let getYear = test.split('.')[2];
    let date: any = getMonth + '/' + getDate + '/' + getYear;
    date = new Date(date);
    return date;
  }
}
