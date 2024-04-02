import { Component, OnInit } from '@angular/core';
import { NgIf} from '@angular/common';
//Material
import { provideNativeDateAdapter, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
//eigenes
import { firebaseService } from '../../../firebase-services/firebase.service';
import { Witness } from '../../../../models/witness.class';
import { Event } from '../../../../models/event.class';

@Component({
  selector: 'app-dialog-edit-event',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatOption,
    MatDialogActions,
    MatInputModule,
    NgIf,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],

  templateUrl: './dialog-edit-event.component.html',
  styleUrl: './dialog-edit-event.component.scss',
})
export class DialogEditEventComponent implements OnInit {

  loading: boolean = false;
  witness = new Witness();
  witnessId: string | null = '';
  event!: Event;
  eventId = 'temp';
  eventWitnesses!: Witness[];
  eventWitnessesIdList!: string[];
  witnessesControl = new FormControl<Witness[] | null>( null, Validators.required);
  selected = 'Zeugen auswählen';
  tempDate!: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogEditEventComponent>,
    public fireService: firebaseService
  ) {}

  ngOnInit(): void {
    if (this.event.docId)  this.eventId = this.event.docId;
    this.tempDate = this.changeDateformat();
    this.getWitnessesListbyEventId();
    this.witnessesControl.setValue(this.eventWitnesses);
  }

  async editEvent() {
    this.loading = true;
    let dateString = this.tempDate?.toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let tempWitnessesId: any[] = [];
    this.witnessesControl.value?.forEach((element) => {
      tempWitnessesId.push(element.docId);
    });
    let tempEvent: Event = {
      docId: this.eventId,
      date: dateString,
      time: this.event.time,
      place: this.event.place,
      description: this.event.description,
      type: this.event.type,
      witnesses: tempWitnessesId,
    };

    await this.fireService.updateSingleEvent(this.eventId, tempEvent);
    this.loading = false;
    this.dialogRef.close();
  }

  getWitnessesListbyEventId() {
    let tempWitnesses = this.event.witnesses;
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
