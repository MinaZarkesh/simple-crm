import { Component, OnInit } from '@angular/core';
import { firebaseService } from '../firebase-services/firebase.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
//classes
import { Witness } from '../../models/witness.class';
import { Statement } from '../../models/statement.class';
import { Event } from '../../models/event.class';
//Dialogs
import { MatDialog } from '@angular/material/dialog';
import { DialogAddWitnessComponent } from './dialogs/dialog-add-witness/dialog-add-witness.component';
import { DialogEditWitnessComponent } from './dialogs/dialog-edit-witness/dialog-edit-witness.component';
import { DialogDeleteWitnessComponent } from './dialogs/dialog-delete-witness/dialog-delete-witness.component';
//for html/MaterialDesign
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-witness',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
  ],
  templateUrl: './witness.component.html',
  styleUrl: './witness.component.scss',
})
export class WitnessComponent implements OnInit {
  //for html
  panelOpenState = false;
  witness: Witness = new Witness();
  witnesses: Witness[] = [];
  dummyWitnesses: Witness[] = [
    {
      docId: 'Zeuge_id1',
      name: 'John Doe',
      address: 'Musterstraße 1, 30657 Hannover',
      phone: '01234567890',
      role: 'Opfer',
      statements: [
        'statement_id1',
        'statement_id2',
        'statement_id3',
        'statement_id4',
      ],
    },
    {
      docId: 'Zeuge_id2',
      name: 'Jane Doe',
      address: 'Musterstraße 2, 30657 Hannover',
      phone: '01234567891',
      role: 'Beobachter',
      statements: [
        'statement_id5',
        'statement_id6',
        'statement_id7',
        'statement_id8',
      ],
    },
    {
      docId: 'Zeuge_id3',
      name: 'John Smith',
      address: 'Musterstraße 10, 30657 Hannover',
      phone: '01234567899',
      role: 'Angeklagter',
      statements: [
        'statement_id37',
        'statement_id38',
        'statement_id39',
        'statement_id40',
      ],
    },
  ];

  constructor(public dialog: MatDialog,
    public fireService: firebaseService) //  public fireService: firebaseService
  {}

  ngOnInit(): void {}

  getWitnessesList(): Witness[] {
    // console.log('getWitnessesList: ', this.fireService.witnesses);
    // console.log('getWitnessesList: ', this.dummyWitnesses);
    // return this.fireService.witnesses;
    return this.fireService.witnesses;
  }

  openAddWitnessDialog() {
    this.dialog.open(DialogAddWitnessComponent);
  }
}
