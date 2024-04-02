import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
//diagolgs
import { DialogEditEventComponent } from '../dialogs/dialog-edit-event/dialog-edit-event.component';
import { Witness } from '../../../models/witness.class';
import { Statement } from '../../../models/statement.class';
import { Event } from '../../../models/event.class';
import { firebaseService } from '../../firebase-services/firebase.service';
import { MatDialogModule } from '@angular/material/dialog';
// import { DialogAddWitnessComponent } from '../dialogs/dialog-add-witness/dialog-add-witness.component';
import { DialogAddStatementComponent } from '../../statement/dialogs/dialog-add-statement/dialog-add-statement.component';
import { DialogEditStatementComponent } from '../../statement/dialogs/dialog-edit-statement/dialog-edit-statement.component';
import { DialogDeleteStatementComponent } from '../../statement/dialogs/dialog-delete-statement/dialog-delete-statement.component';
//for html/MaterialDesign

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ThemePalette } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatProgressBarModule,
  ProgressBarMode,
} from '@angular/material/progress-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  currentWitness!: Witness;
  witnessId!: string;
  witnesses!: Witness[];
  currentStatement!: Statement;
  statementId!: string;
  statements!: Statement[];
  filteredStatements!: Statement[];
  textContentJSON: any = {
    one: '',
    two: '',
    three: '',
    four: '',
  };

  //for grid in header
  tiles: Tile[] = [
    { text: this.textContentJSON.one, cols: 3, rows: 1, color: 'lightblue' },
    { text: this.textContentJSON.two, cols: 1, rows: 2, color: 'lightgreen' },
    { text: this.textContentJSON.three, cols: 1, rows: 1, color: 'lightpink' },
    { text: this.textContentJSON.four, cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  /**
   * Constructor for initializing the component.
   *
   * @param {ActivatedRoute} route - the route object for the component
   * @param {firebaseService} fireService - the firebase service for data operations
   * @param {MatDialog} dialog - the dialog service for opening dialogs
   */
  constructor(
    private route: ActivatedRoute,
    public fireService: firebaseService,
    public dialog: MatDialog
  ) {}


    /**
   * Initializes the component and fetches the necessary data.
   *
   * This function is called when the component is initialized. It retrieves the 'id' parameter from the route snapshot and assigns it to the 'eventId' property of the component. It then subscribes to the 'subWitnessesList', 'subStatementsList', and 'subEventsList' observables from the 'fireService' to fetch the witnesses, statements, and events respectively. It also calls the 'getSingleEvent' method of the 'fireService' to fetch the details of the current event. Finally, it assigns the values returned by the 'getWitnessesList', 'getStatementsList', and 'getEventsList' methods of the 'fireService' to the 'witnesses', 'statements', and 'events' properties of the component respectively. The 'currentEvent' property is set by calling the 'getEventById' method with the 'eventId' parameter.
   *
   * @return {Promise<void>} A promise that resolves when the initialization is complete.
   */
  async ngOnInit() {
    this.eventId = this.fireService.id =
      this.route.snapshot.paramMap.get('id')!;
    await this.fireService.subWitnessesList();
    await this.fireService.subStatementsList();
    await this.fireService.subEventsList();
    await this.fireService.getSingleEvent(this.eventId);
    this.witnesses = await this.fireService.getWitnessesList();
    this.statements = await this.fireService.getStatementsList();
    this.events = await this.fireService.getEventsList();
    this.currentEvent = this.getEventById(this.eventId);
  }

    /**
   * Retrieves the event ID based on the input parameter.
   *
   * @param {string} id - the input parameter for the event ID
   * @return {string} the retrieved event ID
   */
  getEventId(id: string) {
    if (id) {
      return id;
    } else {
      console.log('getEventId gone wrong: ', id);
      return 'test';
    }
  }

    /**
   * Retrieves an event by its ID from the list of events in the fireService.
   * If the event is found, it is assigned to the currentEvent property of the fireService.
   * If the event is not found, the currentEvent property of the fireService is returned.
   *
   * @param {string | undefined} id - The ID of the event to retrieve.
   * @return {Event | undefined} - The event with the specified ID, or undefined if not found.
   */
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

    /**
   * Retrieves the name of a witness by its ID.
   *
   * @param {string} witnessId - The ID of the witness.
   * @return {string} The name of the witness.
   */
  getWitnessNamebyId(witnessId: string) {
    let tempWitness: Witness;
    let tempName: string;
    tempWitness = this.getWitnessById(witnessId);
    tempName = tempWitness.name;
    return tempName;
  }

    /**
   * Retrieves a witness from the list of witnesses based on the provided witness ID.
   *
   * @param {string} witnessId - The ID of the witness to retrieve.
   * @return {Witness} The witness object that matches the provided ID, or the current witness if no match is found.
   */
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

    /**
   * Filters the statements by witness ID.
   *
   * @param {string} witnessId - The ID of the witness.
   * @return {Statement[]} An array of filtered statements.
   */
  filterStatementsByWitnessId(witnessId: string): Statement[] {
    let filterStatements: Statement[] = [];
    this.fireService.statements.forEach((element) => {
      if (element.witness == witnessId && element.event == this.eventId) {
        filterStatements.push(element);
      }
    });
    this.filteredStatements = this.fireService.filteredStatements =
      filterStatements;
    return filterStatements;
  }

    /**
   * Retrieves a statement by its ID.
   *
   * @param {any} id - The ID of the statement to retrieve.
   * @return {Statement} The statement with the specified ID, or the current statement if the ID is not found.
   */
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

    /**
   * Retrieves an event by a given statement ID.
   *
   * @param {string} statementId - The ID of the statement to retrieve the event for.
   * @return {Event} The event corresponding to the provided statement ID.
   */
  getEventByStatementId(statementId: string): Event {
    let statement = this.getStatementById(statementId);
    let eventId = statement.event;
    let event = this.getEventById(eventId);
    return event;
  }

    /**
   * Retrieves the witness list by the given statement ID.
   *
   * @param {string | undefined} statementId - the ID of the statement
   * @return {string[]} the list of witness names
   */
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
      return tempWitnessList;
    } else {
      return 'Fehler';
    }
  }

    /**
   * A description of the entire function.
   *
   * @param {string} id - description of parameter
   * @return {string} description of return value
   */
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

    /**
   * Filter events by witness ID.
   *
   * @param {string} id - The ID of the witness
   * @return {Event[]} The filtered list of events
   */
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

    /**
   * A description of the entire function.
   *
   * @param {number} idx - description of parameter
   * @return {Promise<void>} description of return value
   */
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

  /**
   * Opens a dialog to edit a statement.
   *
   * @param {number} idx - the index of the statement to edit
   */
  openEditStatementDialog(idx: number) {
    const dialog = this.dialog.open(DialogEditStatementComponent);
    this.currentStatement = this.fireService.filteredStatements[idx];
    if (this.currentStatement.docId) {
      this.statementId = this.getStatementId(this.currentStatement.docId);
    }
    dialog.componentInstance.witness = new Witness(
      this.fireService.currentWitness
    );
    dialog.componentInstance.statement = new Statement(this.currentStatement);
    this.currentEvent = this.getEventById(this.currentStatement.event);
    dialog.componentInstance.filteredStatementIndex = idx;
    dialog.componentInstance.event = this.currentEvent;
    dialog.componentInstance.allEvents = this.filterEventsByWitnessId(
      this.witnessId
    );
    dialog.componentInstance.witnessId = this.witnessId;
  }

    /**
   * Opens the delete statement dialog and sets the necessary properties.
   *
   * @param {number} idx - The index of the statement to be deleted
   */
  openDeleteStatementDialog(idx: number) {
    const dialog = this.dialog.open(DialogDeleteStatementComponent);
    this.currentStatement = this.fireService.filteredStatements[idx];

    if (this.currentStatement.docId) {
      this.statementId = this.getStatementId(this.currentStatement.docId);
    }
    dialog.componentInstance.filteredStatementIndex = idx;
    dialog.componentInstance.statement = this.currentStatement;
    dialog.componentInstance.statementId = this.statementId;
    dialog.componentInstance.witness = this.currentWitness;
    dialog.componentInstance.witnessId = this.witnessId;
    dialog.componentInstance.filteredStatements =
      this.fireService.filteredStatements;
  }

    /**
   * Opens the edit event dialog and sets the event data for the dialog component.
   *
   * @param {Event} event - The event object to be edited.
   */
  openEditEventDialog(event: Event) {
    const dialog = this.dialog.open(DialogEditEventComponent);
    dialog.componentInstance.event = new Event(event);
    if (event.docId != undefined) {
      dialog.componentInstance.eventId = event.docId;
      dialog.componentInstance.eventWitnessesIdList = event.witnesses;
    }
  }
}
