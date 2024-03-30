import { Component } from '@angular/core';
import { Witness } from '../../../../models/witness.class';
import { firebaseService } from '../../../firebase-services/firebase.service';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Statement } from '../../../../models/statement.class';
import { Event } from '../../../../models/event.class';
@Component({
  selector: 'app-dialog-delete-event',
  standalone: true,
  imports: [
    NgIf,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './dialog-delete-event.component.html',
  styleUrl: './dialog-delete-event.component.scss',
})
export class DialogDeleteEventComponent {
  event!: Event;
  eventId!: string;
  statements!: Statement[];
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteEventComponent>,
    private fireService: firebaseService
  ) {}

  async deletefilteredStatement() {
    this.statements = this.fireService.statements;
    let tempStatements: any[] = [];
    this.statements.find((element) => {
      if (element.event == this.event.docId) {
        tempStatements.push(element);
      }
    });
    // let stmt = this.statements[i];
    console.log(
      'filteredStatements: ',
      this.statements,
      this.event.docId,
      tempStatements
    );

    await tempStatements.forEach((stmt) => {
      this.fireService.deleteSingleStatement(stmt.docId);
      console.log('deleted: ', stmt.docId);
    });
    console.log(
      'updateStatements: ',
      this.fireService.statements,this.fireService.events, this.fireService.witnesses
    );
  }

  async deleteEvent() {
    this.loading = true;
    console.log("delete id: ",this.eventId);
    await this.deletefilteredStatement();
    if(this.event.docId){
      this.eventId = this.event.docId
    }
    await this.fireService.deleteSingleEvent(this.eventId);
    this.loading = false;
    console.log('deleted: ', this.event, this.event.docId);
  }
}
