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
import { DialogEditWitnessComponent } from '../dialogs/dialog-edit-witness/dialog-edit-witness.component';
import { DialogDeleteWitnessComponent } from '../dialogs/dialog-delete-witness/dialog-delete-witness.component';
import { DialogAddStatementComponent } from '../../statement/dialogs/dialog-add-statement/dialog-add-statement.component';
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
import { DialogDeleteStatementComponent } from '../../statement/dialogs/dialog-delete-statement/dialog-delete-statement.component';
import { DialogEditStatementComponent } from '../../statement/dialogs/dialog-edit-statement/dialog-edit-statement.component';
import { DialogEditEventComponent } from '../../event/dialogs/dialog-edit-event/dialog-edit-event.component';

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
  //defining variables
  witnesses: Witness[] = [];
  statements: Statement[] = [];
  events: Event[] = [];

  id!: string;
  currentWitness: Witness = new Witness();
  witnessId!: string;
  filteredStatements: Statement[] = [];
  statementId!: string;
  currentStatement: Statement = new Statement();
  eventId!: string;
  currentEvent: Event = new Event();
  testEventId:string = 'event_id1';
  //for html allgemein
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
      name: 'James Smith',
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
      witness: 'Zeuge_id1',
      event: 'event_id1',
      date: '23.03.2022',
      time: '08:15',
      place: 'Polizei Dienststelle Hannover',
      comment: 'Aussage 1: Ich habe meinen Nachbarn erkannt.',
      status: 'austehend',
    },
    {
      docId: 'statement_id2',
      witness: 'Zeuge_id2',
      event: 'event_id2',
      date: '23.03.2023',
      time: '10:15',
      place: 'Polizei Dienststelle Hannover',
      comment:
        'Aussage 2:Hier steht ein längerer Text, das soll die Aussage selbst sein',
      status: 'bestätigt',
    },
    {
      docId: 'statement_id3',
      witness: 'Zeuge_id2',
      event: 'event_id3',
      date: '23.03.2024',
      time: '15:40',
      place: 'Polizei Dienststelle Hannover',
      comment:
        'Aussage 3: Hier steht ein längerer Text, das soll die Aussage selbst sein',
      status: 'im Prozess',
    },
    {
      docId: 'statement_id4',
      witness: 'Zeuge_id1',
      event: 'event_id4',
      date: '23.03.2025',
      time: '10:15',
      place: 'Polizei Dienststelle Hannover',
      comment: 'Aussage 4: Ich verweigere die Aussage zu diesem Ereignis',
      status: 'verweigert',
    },
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
      witnesses: ['Zeuge_id1', 'Zeuge_id3', 'Zeuge_id2'],
    },
    {
      docId: 'event_id2',
      date: '23.03.2022',
      time: '14:45',
      place: 'Hannover',
      type: 'Verbrechen',
      description:
        'Event 2: Ein Raubüberfall fand in der Musterstraße 1 statt.',
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
      witnesses: ['Zeuge_id2'],
    },
    {
      docId: 'event_id4',
      date: '23.03.2022',
      time: '15:00',
      place: 'Hannover',
      type: 'Beobachtung',
      description:
        'Event 4: Ein verdächtiger Mann wurde in der Nähe des Tatorts gesehen.',
      witnesses: ['Zeuge_id1', 'Zeuge_id2', 'Zeuge_id1'],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public fireService: firebaseService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('id: Init: ', this.id);

    //be sure arrays are not empty
    // this.fireService.witnesses = this.dummyWitnesses;
    // this.fireService.statements = this.dummyStatements;
    // this.fireService.events = this.dummyEvents;
    this.fireService.getWitnessesList();
    this.fireService.getStatementsList();
    this.fireService.getEventsList();
    
    //get Witness Data
    this.witnessId = this.getWitnessId(this.id);
    console.log('witnessId: Init: ', this.witnessId);
    this.currentWitness = this.getWitnessById(this.witnessId);
    console.log('currentWitness: Init: ', this.currentWitness);
    if (this.currentWitness.docId) {
      this.filterStatementsByWitnessId(this.currentWitness.docId);
      console.log(
        'filterStatementsByWitnessId filtered: ',
        this.filteredStatements
      );
    }

    //get Statement Data
    // this.currentStatement = this.getStatementById(
    //   this.filteredStatements[0].docId
    // );
    console.log('Init: currentStatement: ', this.currentStatement);

    console.log('Init: currentEvent: ', this.currentEvent);

    // console.log("Init: currentEventWitnessList: ", this.getWitnessListbyStatementId('statement_id1'))
  }

  getWitnessId(id: string): string {
    // else 'Zeuge_id1'
    let temp!: Witness;
    temp = this.getWitnessById(id);
    if (id == temp.docId) {
      return id;
    } else {
      return 'Zeuge_id1';
    }
  }

  getWitnessById(id: string): Witness {
    let currentWitness: Witness | undefined = undefined;
    //temp is first undefined, var for .find
    let temp: Witness | undefined = undefined;

    //if element.docId == id, temp is element in form of Witness
    // rewrite temp with found element, if nothing found temp is still undefined
    currentWitness = this.fireService.witnesses.find((element) => {
      if (element.docId == id) {
        temp = new Witness(element);
      }
      return temp;
    });

    //if currentWitness is not undefined return it, else return dummy Data
    if (currentWitness != undefined) {
      return currentWitness;
    } else {
      return this.dummyWitnesses[0];
    }
  }

  filterStatementsByWitnessId(witnessId: string): Statement[] {
    let filterStatement: Statement[] = [];

    this.fireService.statements.forEach((element) => {
      if (element.witness == witnessId) {
        filterStatement.push(element);
      }
    });

    this.filteredStatements = filterStatement;
    return filterStatement;
  }

  getStatementById(id: any): Statement {
    // else dummyStatements[0]
    let currentStatement: Statement | undefined = undefined;
    //temp is first undefined, var for .find
    let temp: Statement | undefined = undefined;

    //search Statement by id
    currentStatement = this.fireService.statements.find((element) => {
      if (element.docId == id) {
        temp = new Statement(element);
      }
      return temp;
    });
    //if you cant find it, temp is still undefined
    if (currentStatement != undefined) {
      return currentStatement;
    } else {
      return this.dummyStatements[0];
    }
  }

  getStatementId(id: string): string {
    {
      let temp!: Statement;
      temp = this.getStatementById(id);
      if (id == temp.docId) {
        return id;
      } else {
        return 'statement_id1';
      }
    }
  }

  getEventById(id: any): Event {
    //else dummyEvents[0]
    let currentEvent: Event | undefined = undefined;
    let temp: Event | undefined = undefined;
    currentEvent = this.fireService.events.find((element) => {
      if (element.docId == id) {
        temp = new Event(element);
      }
      return temp;
    });

    if (currentEvent != undefined) {
      return currentEvent;
    } else {
      return this.dummyEvents[0];
    }
  }

  getEventByStatementId(statementId: string): Event {
    let statement = this.getStatementById(statementId);
    let eventId = statement.event;
    let event = this.getEventById(eventId);
    // console.log('getEventByStatementId: ', event);
    return event;
  }

  getWitnessListbyStatementId(statementId: string |undefined) {
    let tempWitnessList: string[] = [];
    let tempEvent: Event;
    let tempWitness:Witness;
    let tempName: string;
    let eventId;
    if(statementId != undefined){
      eventId = this.getEventByStatementId(statementId).docId;
      tempEvent = this.getEventById(eventId);
      tempEvent.witnesses.forEach((wit)=>{
        tempWitness = this.getWitnessById(wit);
        tempName = tempWitness.name;
        tempWitnessList.push(tempName);
      })
      // console.log('testen: ', tempWitnessList);
      return tempWitnessList;
    }else{
      return "verkackt";
    }
    
  }

  getAllEvents() {
    let allEvents: Event[] = [];

    this.dummyEvents.forEach((eve) => {
      allEvents.push(eve);
    });
    return allEvents;
  }

  openEditWitnessDialog() {
    const dialog = this.dialog.open(DialogEditWitnessComponent);
    // //user -> Variable aus DialogUserComponent
    // // NICHT .user = this.currentUser, denn das bearbeitet auch den aktuellen User

    // new User(this.currentUser) erstellt ein neues User-Objekt, eine Kopie des aktuellen
    console.log(this.currentWitness);
    dialog.componentInstance.witness = new Witness(
      this.fireService.currentWitness
    );

    dialog.componentInstance.witnessId = this.witnessId;
    //  dialog.componentInstance.trails = this.trails;
  }

  openDeleteWitnessDialog() {
    const dialog = this.dialog.open(DialogDeleteWitnessComponent);
    dialog.componentInstance.witness = new Witness(this.currentWitness);
  }

  openAddStatementDialog() {
    const dialog = this.dialog.open(DialogAddStatementComponent);
    dialog.componentInstance.witness = new Witness(this.currentWitness);
    dialog.componentInstance.witnessId = this.witnessId;
    dialog.componentInstance.allEvents = this.dummyEvents;
    dialog.componentInstance.filteredStatements = this.filteredStatements;
  }

  openEditStatementDialog() {
    const dialog = this.dialog.open(DialogEditStatementComponent);
    // //user -> Variable aus DialogUserComponent
    // // NICHT .user = this.currentUser, denn das bearbeitet auch den aktuellen User

    // new User(this.currentUser) erstellt ein neues User-Objekt, eine Kopie des aktuellen
    console.log(this.currentWitness);
    //  dialog.componentInstance.witness = new Witness(this.fireService.currentWitness);

    // dialog.componentInstance.witnessId = this.witnessId;
    //  dialog.componentInstance.trails = this.trails;
  }

  openDeleteStatementDialog() {
    const dialog = this.dialog.open(DialogDeleteStatementComponent);
    // dialog.componentInstance.witness = new Witness(this.currentWitness);
  }

  openEditEventDialog() {
    const dialog = this.dialog.open(DialogEditEventComponent);
    //  dialog.componentInstance
  }

  checkComment() {
    console.log(
      'Test: ',
      this.filteredStatements[this.filteredStatements.length - 1].comment
    );
  }
  
}