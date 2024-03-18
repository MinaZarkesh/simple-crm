import { Component } from '@angular/core';
import { Statement } from '../../../../models/statement.class';
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
import { Witness } from '../../../../models/witness.class';

@Component({
  selector: 'app-dialog-delete-statement',
  standalone: true,
  imports: [
    NgIf,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './dialog-delete-statement.component.html',
  styleUrl: './dialog-delete-statement.component.scss',
})
export class DialogDeleteStatementComponent {
  statement!: Statement;
  statementId!: string;
  witness!: Witness;
  witnessId!: string;
  filteredStatementIndex!: number;
  filteredStatements!: Statement[];

  index: number = -1;
  loading: boolean = false;
  statements: Statement[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteStatementComponent>,
    private fireService: firebaseService
  ) {}

  async deleteStatement() {
    this.loading = true;
    console.log('statement: ', this.statement);
    this.filteredStatements.splice(this.filteredStatementIndex, 1);
    this.fireService.deleteSingleStatement(this.statementId);
    console.log('filteredStatements: ', this.filteredStatements);
    this.witness.statements.splice(this.filteredStatementIndex, 1);
    this.fireService.updateSingleWitness(this.witnessId, this.witness);
    console.log('currentWitness: ', this.witness);

    this.loading = false;
    this.dialogRef.close();
  }
}
