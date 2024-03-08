import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//classes
import { Witness } from '../../../models/witness.class';
import { Statement } from '../../../models/statement.class';
import { Event } from '../../../models/event.class';
//diagolgs
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
// import { DialogAddWitnessComponent } from '../dialogs/dialog-add-witness/dialog-add-witness.component';
// import { DialogEditWitnessComponent } from '../dialogs/dialog-edit-witness/dialog-edit-witness.component';
// import { DialogDeleteWitnessComponent } from '../dialogs/dialog-delete-witness/dialog-delete-witness.component';

//for html/MaterialDesign
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { ThemePalette } from '@angular/material/core';
import {
  MatProgressBarModule,
  ProgressBarMode,
} from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { firebaseService } from '../../firebase-services/firebase.service';

@Component({
  selector: 'app-witness-detail',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  templateUrl: './witness-detail.component.html',
  styleUrl: './witness-detail.component.scss',
})
export class WitnessDetailComponent implements OnInit {
  witness: Witness = new Witness();
  event: Event = new Event();
  statement: Statement = new Statement();
  witnesses: Witness[] = [];
  events: Event[] = [];
  statements: Statement[] = [];

  currentWitness: Witness = new Witness();
  userId!: string;
  loading: boolean = false;
  panelOpenState = false;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 66;
  bufferValue = 75;

  checked = true;
  disabled = false;

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
        'statement_id5',
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

  dummyStatements: any[] = [
    {
      docId: 'statement_id1',
      user: 'Zeuge_id1',
      event: 'event_id1',
      date: '23.03.2022',
      time: '08:15',
      place: 'Polizei Dienststelle Hannover',
      comment: 'Aussage 1: Hier steht ein längerer Text, das soll die Aussage selbst sein',
      status: 'austehend',
    },
    {
      docId: 'statement_id2',
      user: 'Zeuge_id1',
      event: 'event_id2',
      date: '23.03.2023',
      time: '10:15',
      place: 'Polizei Dienststelle Hannover',
      comment: 'Aussage 2:Hier steht ein längerer Text, das soll die Aussage selbst sein',
      status: 'bestätigt',
    },
    {
      docId: 'statement_id3',
      user: 'Zeuge_id1',
      event: 'event_id3',
      date: '23.03.2024',
      time: '15:40',
      place: 'Polizei Dienststelle Hannover',
      comment: 'Aussage 3: Hier steht ein längerer Text, das soll die Aussage selbst sein',
      status: 'im Prozess',
    },
    {
      docId: 'statement_id4',
      user: 'Zeuge_id1',
      event: 'event_id4',
      date: '23.03.2025',
      time: '10:15',
      place: 'Polizei Dienststelle Hannover',
      comment: 'Aussage 4: Ich verweigere die Aussage zu diesem Ereignis',
      status: 'verweigert',
    }
  ];

  dummyEvents: any[] = [
    {
      docId: 'event_id1',
      date: '23.03.2022',
      time: '15:25',
      place: 'Hannover',
      type: 'Unfall',
      description:
        'Event 1: Der verdächtige Mann hatte einen Unfall, während er zu fliehen versuchte.',
      witnesses: ['Zeuge_id1', 'Zeuge_id8', 'Zeuge_id9'],
    },
    {
      docId: 'event_id2',
      date: '23.03.2022',
      time: '14:45',
      place: 'Hannover',
      type: 'Verbrechen',
      description: 'Event 2: Ein Raubüberfall fand in der Musterstraße 1 statt.',
      witnesses: ['Zeuge_id1', 'Zeuge_id2', 'Zeuge_id3'],
    },
    {
      docId: 'event_id3',
      date: '23.03.2022',
      time: '15:00',
      place: 'Hannover',
      type: 'Beobachtung',
      description:
        'Event 3: Ein verdächtiger Mann wurde in der Nähe des Tatorts gesehen.',
      witnesses: ['Zeuge_id4', 'Zeuge_id5', 'Zeuge_id6'],
    },
    {
      docId: 'event_id4',
      date: '23.03.2022',
      time: '15:00',
      place: 'Hannover',
      type: 'Beobachtung',
      description:
        'Event 4: Ein verdächtiger Mann wurde in der ≠he des Tatorts gesehen.',
      witnesses: ['Zeuge_id7', 'Zeuge_id8', 'Zeuge_id9'],
    }
  ];

  constructor(
    private route: ActivatedRoute,
    public fireService: firebaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getWitnessId(this.userId);
    this.currentWitness = this.getWitnessById(this.userId);
    console.log('currentWitness: Init: ', this.currentWitness);

    // this.userService.subSingleUser(this.userId);
  }

  getWitnessId(id: string) {
    console.log('getWitnessId: ', id);
    console.log('witnesses: ', this.fireService.witnesses);

    if (id) {
      return id;
    } else {
      console.log('getWitnessId: ', id);
      if (this.fireService.witnesses.length == 0) {
        return (this.fireService.witnesses = this.dummyWitnesses);
      }
      let tempID = this.fireService.witnesses.find(
        (element) => element.docId == id
      );
      console.log('tempID: ', tempID);
      if (tempID) {
        return tempID;
      } else {
        return 'Zeuge_id3';
      }
    }
  }

  getWitnessById(id: any): any {
    let currentWitness: any = {};
    if (this.fireService.witnesses.length == 0) {
      this.fireService.witnesses = this.dummyWitnesses;
    }
    currentWitness = this.fireService.witnesses.find((element) => {
      element.docId == id;
      return element;
    });
    if (currentWitness instanceof Witness) {
      return currentWitness;
    } else {
      return this.dummyWitnesses[0];
    }
  }
}
