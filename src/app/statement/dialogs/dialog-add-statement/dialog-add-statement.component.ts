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
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
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
  event!: Event;
  statement = new Statement();
  statementId!:string;
  witness!: Witness;
  witnessId!: string;
  filteredStatements!: Statement[];
  tempDate: any;
  tempTime: any;
  constructor(
    private route: ActivatedRoute,
    public fireService: firebaseService,
    public dialogRef: MatDialogRef<DialogAddStatementComponent>
  ) {}

  ngOnInit(): void {
    console.log('ngInit addStatement: ', this.witness.name);
    this.setDefaultWitness();
  }

  setDefaultWitness() {
    if (this.witness) {
      console.log(this.witness.statements);
    }
  }

  updatefilterStatements(witness: Witness, statementId:string){
    let tempId = statementId;
    this.witness.statements.push(statementId);
  }

  async addStatement() {
    let tempEvent!: string;
    let dateString!:any;
    //  let id:any;
    dateString = this.tempDate?.toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    // console.log("dateString:" ,dateString);
    if (
      this.eventControl.value?.docId != null ||
      this.eventControl.value?.docId != undefined
    ) {
      tempEvent = this.eventControl.value?.docId;
      // this.statement.date = this.tempDate?.getTime().toString() || "0";
    } else {
      // id = this.fireService.statements.length+1;
      tempEvent = 'event_id1';
    }

    let tempStatement: Statement = {
      docId: 'test',
      witness: this.witnessId,
      event: tempEvent,
      date: dateString,
      time: this.statement.time,
      place: this.statement.place,
      comment: '',
      status: '',
    };

    await this.fireService.addStatement(tempStatement);
    
    // this.filteredStatements.push(tempStatement);
    this.witness.statements.push(this.fireService.statementId);
    await this.fireService.updateSingleWitness(this.witnessId, this.witness);
    this.dialogRef.close();
  }

}
