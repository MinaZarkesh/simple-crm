import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Witness } from '../../../../models/witness.class';
import { Event } from '../../../../models/event.class';
import { MatOption } from '@angular/material/core';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, Validators } from '@angular/forms';
import { Statement } from '../../../../models/statement.class';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import {  MatDialogRef} from '@angular/material/dialog';
import { firebaseService } from '../../../firebase-services/firebase.service';


@Component({
  selector: 'app-dialog-add-statement',
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
  templateUrl: './dialog-add-statement.component.html',
  styleUrl: './dialog-add-statement.component.scss',
})


export class DialogAddStatementComponent implements OnInit {

  eventControl = new FormControl<Event | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  loading: boolean = false;

  allEvents: Event[] = [];
  event!:Event;
  statement = new Statement();
  witness!: Witness;
  witnessId!: string;
  filteredStatements!: Statement[];
  tempDate:any;
  tempTime:any;
  constructor(
    private route: ActivatedRoute,
    public fireService: firebaseService,
    public dialogRef: MatDialogRef<DialogAddStatementComponent>
  ) {}

  ngOnInit(): void {
    console.log('ngInit edit: ', this.witness.name);
    this.setDefaultWitness();
    console.log("ngInit addStatement: ", this.allEvents);
  }

  setDefaultWitness() {
    if (this.witness) {
      console.log(this.witness.name);
    }
  }

  async addStatement(){
   let tempEvent!:string;

  //  let id:any;
    if(this.eventControl.value?.docId != null || this.eventControl.value?.docId != undefined){
      tempEvent = this.eventControl.value?.docId
    }else{
      // id = this.fireService.statements.length+1;
      tempEvent = "event_id1";
    }
    let tempStatement: Statement = {
      docId: this.fireService.statementId,
      witness: this.witnessId,
      event: tempEvent,
      date: this.statement.date,
      time: this.statement.time,
      place: this.statement.place,
      comment: '',
      status: ''
    }
    this.filteredStatements.push(tempStatement);
    console.log("addStatement: ", tempStatement);
    this.dialogRef.close();
  }
}
