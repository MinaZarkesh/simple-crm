import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { firebaseService } from '../../../firebase-services/firebase.service';
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

    /**
   * Deletes filtered statements asynchronously.
   *
   * @return {Promise<void>} A promise that resolves when the function completes.
   */
  async deletefilteredStatement() {
    this.statements = this.fireService.statements;
    let tempStatements: any[] = [];

    this.statements.find((element) => {
      if (element.event == this.event.docId) {
        tempStatements.push(element);
      }
    });

    await tempStatements.forEach((stmt) => {
      this.fireService.deleteSingleStatement(stmt.docId);
    });
  }

  
    /**
   * Delete an event by performing the following steps:
   * - Set loading to true
   * - Delete filtered statement
   * - If event has docId, set eventId to docId
   * - Delete a single event using fireService
   * - Set loading to false
   */
  async deleteEvent() {
    this.loading = true;

    await this.deletefilteredStatement();
    if(this.event.docId) this.eventId = this.event.docId;
    await this.fireService.deleteSingleEvent(this.eventId);

    this.loading = false;
  }
}
