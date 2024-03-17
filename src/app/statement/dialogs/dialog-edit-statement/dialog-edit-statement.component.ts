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
  selector: 'app-dialog-edit-statement',
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
  templateUrl: './dialog-edit-statement.component.html',
  styleUrl: './dialog-edit-statement.component.scss',
})
export class DialogEditStatementComponent implements OnInit {
  eventControl = new FormControl<Event | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  loading: boolean = false;
  selectedEvent!: Event;
  allEvents: Event[] = [];
  event!: Event;
  filteredStatementIndex!: number;
  statement!: Statement;
  statementId!: string;
  witness!: Witness;
  witnessId!: string;
  filteredStatements!: Statement[];
  tempDate: any;
  tempTime: any;
  constructor(
    private route: ActivatedRoute,
    public fireService: firebaseService,
    public dialogRef: MatDialogRef<DialogEditStatementComponent>
  ) {}

  ngOnInit(): void {
    this.tempDate = this.changeDateformat();
    this.eventControl.setValue(this.event);
  }

  changeDateformat() {
    let test = this.statement.date;
    let getMonth = test.split('.')[1];
    let getDate = test.split('.')[0];
    let getYear = test.split('.')[2];
    let date: any = getMonth + '/' + getDate + '/' + getYear;
    date = new Date(date);
    return date;
  }

  async editStatement() {
    this.loading = true;
    let tempEvent!: string;
    let dateString!: any;
    dateString = this.tempDate?.toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    if (
      this.eventControl.value?.docId != null ||
      this.eventControl.value?.docId != undefined
    ) {
      tempEvent = this.eventControl.value?.docId;
    } else {
      tempEvent = 'event_id1';
    }

    this.statement.date = dateString;
    this.statement.event = tempEvent;
    console.log('updateStatement: ', this.statement);
    if (this.statement.docId) {
      await this.fireService.updateSingleStatement(
        this.statement.docId,
        this.statement
      );
      this.fireService.filteredStatements[this.filteredStatementIndex] =
        this.statement;
    }
    this.loading = false;
    this.dialogRef.close();
  }
}
