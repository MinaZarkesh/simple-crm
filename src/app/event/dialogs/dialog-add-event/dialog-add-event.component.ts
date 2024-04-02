import { Component} from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgIf} from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
//Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
//eigenes
import { Witness } from '../../../../models/witness.class';
import { Event } from '../../../../models/event.class';
import { firebaseService } from '../../../firebase-services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-add-event',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogActions,
    MatInputModule,
    NgIf
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-event.component.html',
  styleUrl: './dialog-add-event.component.scss',
})
export class DialogAddEventComponent {
 
  witnessId: string | null = '';
  witness = new Witness();
  witnesses: any = this.fireService.witnesses;
  witnessesControl = new FormControl<Witness[] | null>( null, Validators.required);
  
  eventId: string | null = '';
  event = new Event();
  events:any =[];
  
  loading: boolean = false;
  selected = 'Zeugen auswählen';
  tempDate = new Date();

  constructor(
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DialogAddEventComponent>,
    public fireService: firebaseService
  ) {}

  async addEvent() {
    this.loading = true;

    let dateString = this.tempDate?.toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let tempWitnessesId: string[] = [];
    this.witnessesControl.value?.forEach((element) => {
      (element.docId) ? tempWitnessesId.push(element.docId):false
    });

    let tempEvent: Event = {
      docId: 'test',
      date: dateString,
      time: this.event.time,
      place: this.event.place,
      description: this.event.description,
      type: this.event.type,
      witnesses: tempWitnessesId,
    };

    await this.fireService.addEvent(tempEvent);
    console.log("AddEvent: test: ", tempEvent, this.fireService.events);
    this.loading = false;
    this.dialogRef.close();
  }
}
