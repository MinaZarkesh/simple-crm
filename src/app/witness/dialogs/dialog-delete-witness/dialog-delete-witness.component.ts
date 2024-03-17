import { Component } from '@angular/core';
import { Witness } from '../../../../models/witness.class';
import { firebaseService } from '../../../firebase-services/firebase.service';
import { MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete-witness',
  standalone: true,
  imports: [NgIf, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
  templateUrl: './dialog-delete-witness.component.html',
  styleUrl: './dialog-delete-witness.component.scss'
})
export class DialogDeleteWitnessComponent {
witness!: Witness;
witnessId!: string;
index: number = -1;
loading: boolean = false;
witnesses: Witness[] = [];

constructor(public dialogRef: MatDialogRef<DialogDeleteWitnessComponent>, private fireService: firebaseService) {}

async deleteWitness() {
  this.loading = true;
  await this.fireService.deleteSingleWitness(this.witnessId);
  this.loading = false;
  this.dialogRef.close();
  window.location.href = '/witnesses';
}
}
