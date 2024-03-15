import { Component, OnInit } from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//Firebase-Services
import { FirestoreModule } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Witness } from '../../../../models/witness.class';
import { firebaseService } from '../../../firebase-services/firebase.service';
import { Statement } from '../../../../models/statement.class';

@Component({
  selector: 'app-dialog-edit-witness',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    FirestoreModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    NgIf,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-edit-witness.component.html',
  styleUrl: './dialog-edit-witness.component.scss',
})
export class DialogEditWitnessComponent implements OnInit {
  witness!: Witness;
  witnessId!: string;
  witnesses: any = [];
  roles = this.fireService.roles;
  loading: boolean = false;
  htmlStatements: any = new FormControl('');
  selected = 'Rolle im Fall';

  constructor(
    public dialogRef: MatDialogRef<DialogEditWitnessComponent>,
    public fireService: firebaseService
  ) {}

  ngOnInit(): void {
    console.log("'ngInit edit: ", this.witness);
  }

  async saveEdits() {
    this.loading = true;
    await this.fireService.updateSingleWitness(this.witnessId, this.witness);
    console.log('saveWitness: ', this.witness);
    this.loading = false;
    this.dialogRef.close();
  }
}
