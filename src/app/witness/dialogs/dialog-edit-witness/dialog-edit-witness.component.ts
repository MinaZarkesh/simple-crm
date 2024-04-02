import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
//eigene Components
import { Witness } from '../../../../models/witness.class';
import { firebaseService } from '../../../firebase-services/firebase.service';

@Component({
  selector: 'app-dialog-edit-witness',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDialogActions,
    ReactiveFormsModule,
    MatInputModule,
    NgIf
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
  }

  async saveEdits() {
    this.loading = true;
    this.witness.role = this.selected;
    await this.fireService.updateSingleWitness(this.witnessId, this.witness);
    this.loading = false;
    this.dialogRef.close();
  }
}
