import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DialogEditEventComponent } from '../dialogs/dialog-edit-event/dialog-edit-event.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { firebaseService } from '../../firebase-services/firebase.service';
import { Witness } from '../../../models/witness.class';
import { Statement } from '../../../models/statement.class';
import { Event } from '../../../models/event.class';
import { NgFor, NgIf } from '@angular/common';
//diagolgs
import { MatDialogModule } from '@angular/material/dialog';
// import { DialogAddWitnessComponent } from '../dialogs/dialog-add-witness/dialog-add-witness.component';
import { DialogAddStatementComponent } from '../../statement/dialogs/dialog-add-statement/dialog-add-statement.component';
//for html/MaterialDesign
import { MatIconModule } from '@angular/material/icon';
import { ThemePalette } from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogDeleteStatementComponent } from '../../statement/dialogs/dialog-delete-statement/dialog-delete-statement.component';
import { DialogEditStatementComponent } from '../../statement/dialogs/dialog-edit-statement/dialog-edit-statement.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: any;
}

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatGridListModule,
    MatTabGroup,
    MatExpansionModule,
    RouterLink,
    NgIf,
    NgFor,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {

    //for html allgemein
    loading: boolean = false;
    panelOpenState = false;
  
    color: ThemePalette = 'primary';
    mode: ProgressBarMode = 'determinate';
    value = 66;
    bufferValue = 75;
  
    checked = true;
    disabled = false;


  currentEvent!: Event;
  eventId!: string;
  events!: Event[];
  currentWitness!:Witness;
  witnessId!:string;
  witnesses!: Witness[];
  currentStatement!:Statement;
  statementId!:string;
  statements!: Statement[];
  filteredStatements!:Statement[];
  textContentJSON: any = {
    one:'',
    two: '',
    three: '',
    four: '',
  };

  tiles: Tile[] = [
    { text: this.textContentJSON.one, cols: 3, rows: 1, color: 'lightblue' },
    { text: this.textContentJSON.two, cols: 1, rows: 2, color: 'lightgreen' },
    { text: this.textContentJSON.three, cols: 1, rows: 1, color: 'lightpink' },
    { text: this.textContentJSON.four, cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(
    private route: ActivatedRoute,
    public fireService: firebaseService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.eventId = this.fireService.id = this.route.snapshot.paramMap.get('id')!;
    console.log('id: Init: ', this.fireService.id);

    await this.fireService.subWitnessesList();
    await this.fireService.subStatementsList();
    await this.fireService.subEventsList();
    await this.fireService.getSingleEvent(this.eventId);
    this.witnesses = await this.fireService.getWitnessesList();
    this.statements = await this.fireService.getStatementsList();
    this.events = await this.fireService.getEventsList();
    this.currentEvent = this.getEventById(this.eventId);
    
  }

  getEventId(id: string) {
    if (id) {
      return id;
    } else {
      console.log('getEventId gone wrong: ', id);
      return 'test';
    }
  }

  getEventById(id: string | undefined) {
    let currentEvent: Event | undefined = undefined;
    let temp: Event | undefined = undefined;

    currentEvent = this.fireService.events.find((element) => {
      if (element.docId == id) {
        temp = new Event(element);
        this.fireService.currentEvent = new Event(element);
      }
      return temp;
    });
    //if currentWitness is not undefined return it, else return dummy Data
    if (currentEvent != undefined) {
      return currentEvent;
    } else {
      return this.fireService.currentEvent;
    }
  }

  getWitnessNamebyId(witnessId: string) {
    let tempWitness: Witness;
    let tempName: string;

    tempWitness = this.getWitnessById(witnessId);
    tempName = tempWitness.name;
    console.log('testen: ', tempName);
      return tempName;
  }


  getWitnessById(witnessId: string): Witness {
    
    let currentWitness: Witness | undefined = undefined;
    //temp is first undefined, var for .find
    let temp: Witness | undefined = undefined;

    //if element.docId == id, temp is element in form of Witness
    // rewrite temp with found element, if nothing found temp is still undefined
    currentWitness = this.fireService.witnesses.find((element) => {
      if (element.docId == witnessId) {
        temp = new Witness(element);
      }
      return temp;
    });
    //if currentWitness is not undefined return it, else return dummy Data
    if (currentWitness != undefined) {
      return currentWitness;
    } else {
      return this.fireService.currentWitness;
    }
  }

  filterStatementsByWitnessId(witnessId: string): Statement[] {
    
    let filterStatements: Statement[] = [];
    this.fireService.statements.forEach((element) => {
      if (element.witness == witnessId && element.event == this.eventId) {
        filterStatements.push(element);
      }
    });
    this.filteredStatements = this.fireService.filteredStatements = filterStatements;
    return filterStatements;
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
      return this.fireService.currentStatement;
    }
  }

  getEventByStatementId(statementId: string): Event {
    let statement = this.getStatementById(statementId);
    let eventId = statement.event;
    let event = this.getEventById(eventId);
    // console.log('getEventByStatementId: ', event);
    return event;
  }

  getWitnessListbyStatementId(statementId: string | undefined) {
    let tempWitnessList: string[] = [];
    let tempEvent: Event;
    let tempWitness: Witness;
    let tempName: string;
    let eventId;
    if (statementId != undefined) {
      eventId = this.getEventByStatementId(statementId).docId;
      tempEvent = this.getEventById(eventId);
      tempEvent.witnesses.forEach((wit) => {
        tempWitness = this.getWitnessById(wit);
        tempName = tempWitness.name;
        tempWitnessList.push(tempName);
      });
      // console.log('testen: ', tempWitnessList);
      return tempWitnessList;
    } else {
      return 'verkackt';
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

  filterEventsByWitnessId(id: string) {
    let filterEvents: Event[] = [];
    this.fireService.events.forEach((element) => {
      element.witnesses.forEach((witnessId) => {
        if (id == witnessId) {
          filterEvents.push(element);
        }
      });
    });
    console.log('filterEvents: ', filterEvents);
    return filterEvents;
  }

  async checkStatement(idx: number) {
    console.log('checked: ', idx);
    this.currentStatement = this.fireService.filteredStatements[idx];

    if (this.currentStatement.docId) {
      this.statementId = this.getStatementId(this.currentStatement.docId);
    }
    await this.fireService.updateSingleStatement(
      this.statementId,
      this.currentStatement
    );
    this.checked = !this.checked;
  }

  openEditStatementDialog(idx: number) {
    const dialog = this.dialog.open(DialogEditStatementComponent);
    // //user -> Variable aus DialogUserComponent
    // // NICHT .user = this.currentUser, denn das bearbeitet auch den aktuellen User

    // new User(this.currentUser) erstellt ein neues User-Objekt, eine Kopie des aktuellen
    console.log(this.currentWitness);
    this.currentStatement = this.fireService.filteredStatements[idx];

    if (this.currentStatement.docId) {
      this.statementId = this.getStatementId(this.currentStatement.docId);
    }
    dialog.componentInstance.witness = new Witness(
      this.fireService.currentWitness
    );
    dialog.componentInstance.statement = new Statement(this.currentStatement);
    this.currentEvent = this.getEventById(this.currentStatement.event);
    console.log('currentEvent: ', this.currentEvent);
    dialog.componentInstance.filteredStatementIndex = idx;

    dialog.componentInstance.event = this.currentEvent;
    dialog.componentInstance.allEvents = this.filterEventsByWitnessId(
      this.witnessId
    );
    dialog.componentInstance.witnessId = this.witnessId;
  }

  openDeleteStatementDialog(idx: number) {
    const dialog = this.dialog.open(DialogDeleteStatementComponent);
    this.currentStatement = this.fireService.filteredStatements[idx];

    if (this.currentStatement.docId) {
      this.statementId = this.getStatementId(this.currentStatement.docId);
    }

    console.log(
      'openDelete:Statement: ',
      this.currentStatement,
      this.statementId,
      idx
    );
    console.log(
      'openDelete:Witness: ',
      this.currentWitness,
      this.fireService.filteredStatements
    );

    dialog.componentInstance.filteredStatementIndex = idx;
    dialog.componentInstance.statement = this.currentStatement;
    dialog.componentInstance.statementId = this.statementId;
    dialog.componentInstance.witness = this.currentWitness;
    dialog.componentInstance.witnessId = this.witnessId;
    dialog.componentInstance.filteredStatements =
      this.fireService.filteredStatements;
  }

  openEditEventDialog(event: Event) {
    const dialog = this.dialog.open(DialogEditEventComponent);
    dialog.componentInstance.event = new Event(event);
    if (event.docId != undefined) {
      dialog.componentInstance.eventId = event.docId;
       dialog.componentInstance.eventWitnessesIdList = event.witnesses;
    }
  }


}