import { Injectable, inject } from '@angular/core';
import {  Firestore, collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Witness } from '../../models/witness.class';
import { Statement } from '../../models/statement.class';
import { Event } from '../../models/event.class';

interface Role {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root',
})


export class firebaseService {

  loading: boolean = false;
  //Array um die Daten lokal zwischen zu speichern
  witnesses: Witness[] = []; //Zeugen
  statements: Statement[] = []; // Zeugenaussagen
  events: Event[] = []; // Ereignisse
  filteredStatements!:Statement[];
  //Variablen um die Daten in Firestore zu speichern
  id!:string;
  currentWitness: Witness = new Witness();
  currentStatement: Statement = new Statement();
  currentEvent: Event = new Event();

  roles: Role[] = [
    { value: 'Opfer', viewValue: 'Opfer' },
    { value: 'Verdächtiger', viewValue: 'Verdächtiger' },
    { value: 'Hauptverdächtiger', viewValue: 'Hauptverdächtiger' },
    { value: 'Beobachter', viewValue: 'Beobachter' },
    { value: 'Sontiges', viewValue: 'Sonstiges' },
  ];

  // userId: string | null = inject(ActivatedRoute).snapshot.paramMap.get('id');
  witnessId = 'PRgrM5ZikZoNXdMqG8hE';
  statementId = 'PRgrM5ZikZoNXdMqG8hE';
  eventId = 'PRgrM5ZikZoNXdMqG8hE';
  //Lists
  unSubWitnesses;
  unSubStatements;
  unSubEvents;
  firestore: Firestore = inject(Firestore);

  
  /**
   * Initializes the arrays and connects to Firebase using onSnapshot.
   *
   * @return {void}
   */
  constructor() {
    //Arrays initialisieren
    this.witnesses = [];
    this.statements = [];
    this.events = [];
    
    //connect to firebase with onSnapshot
    this.unSubWitnesses = this.subWitnessesList();
    this.unSubStatements = this.subStatementsList();
    this.unSubEvents = this.subEventsList();
  }

    /**
   * Called when the component is being destroyed.
   *
   * @return {void} Nothing is returned from this function.
   */
  ngOnDestroy(): void {
    this.unSubWitnesses();
    this.unSubStatements();
    this.unSubEvents();
  }

  /**
   * An asynchronous function to add a witness to the database.
   *
   * @param {Witness} witness - the witness to be added
   * @return {Promise<void>} a promise that resolves with no value
   */
  async addWitness(witness: Witness) {
     witness.docId = witness.docId!;
    await addDoc(this.getColRef('witnesses'), witness)
      .catch((error) => {
        console.error('Error adding witness: ', error);
      })
      .then((docRef) => {
        //aktualisiert die ID
      this.witnessId = docRef?.id as string;
      });
  }

  /**
   * Adds a statement to the 'statements' collection.
   *
   * @param {Statement} statement - The statement to be added.
   * @return {Promise<void>} - A promise that resolves when the statement is successfully added, or rejects with an error if there was an issue.
   */
  async addStatement(statement: Statement) {
    statement.docId = statement.docId!;
    await addDoc(this.getColRef('statements'), statement)
      .catch((error) => {
        console.error('Error adding statement: ', error);
      })
  }

    /**
   * Adds an event to the database collection.
   *
   * @param {Event} event - the event to be added
   * @return {Promise<void>} a promise that resolves when the event is successfully added, or rejects with an error
   */
  async addEvent(event: Event) {
    event.docId = event.docId!;
    await addDoc(this.getColRef('events'), event)
      .catch((error) => {
        console.error('Error adding event: ', error);
      })
  }

  //update ObjectLists //warum hat async kein Effekt hier?

 /**
  * Updates the witness list by iterating through each element and updating the data in the collection.
  *
  * @return {Promise<void>} 
  */
 async updateWitnessList() {
    //aktualisiert die Daten in der Sammlung
    await this.witnesses.forEach((element) => {
      if (element.docId)  this.updateSingleWitness(element.docId, element);
    });
  }

    /**
   * Asynchronously updates the statement list by iterating over each statement
   * and updating the corresponding document in the database if the statement has
   * a document ID.
   *
   * @return {Promise<void>} A promise that resolves when all statements have been updated.
   */
 async updateStatementList() {
  await  this.statements.forEach((element) => {
      if (element.docId) this.updateSingleStatement(element.docId, element);
    });
  }

    /**
   * Asynchronously updates the event list by iterating through each event and
   * updating the corresponding document in the database if the event has a document ID.
   *
   * @return {Promise<void>} A promise that resolves when all events have been updated.
   */
 async  updateEventList() {
   await this.events.forEach((element) => {
      if (element.docId) this.updateSingleEvent(element.docId, element);
    });
  }

    /**
   * Update a single witness in the database.
   *
   * @param {string} id - the ID of the witness
   * @param {Witness} witness - the updated witness object
   * @return {Promise<void>} a promise that resolves when the update is complete
   */
  async updateSingleWitness(id: string, witness: Witness) {
    if (id) {
      let docRef = this.getSingleDocRef('witnesses', id);      
      await updateDoc(docRef, this.getWitnessObject(witness))
        .catch((err) => {
          console.error('Error updating witness: ', err);
        })
        .then(() => {
          this.currentWitness = witness;
        });
    } else {
      console.error('docId is null');
    }
  }


    /**
   * Updates a single statement in the database.
   *
   * @param {string} id - The ID of the statement to update.
   * @param {Statement} statement - The updated statement object.
   * @return {Promise<void>} - A promise that resolves when the update is complete.
   */

  async updateSingleStatement(id: string, statement: Statement) {
    if (id) {
      let docRef = this.getSingleDocRef('statements', id);
      updateDoc(docRef, this.getStatementObject(statement))
        .catch((err) => {
          console.error('Error updating statement: ', err);
        })
        .then(() => {
          this.currentStatement = statement;
        });
    } else {
      console.error('docId is null');
    }
  }

    /**
   * A description of the entire function.
   *
   * @param {string} id - description of parameter
   * @param {Event} event - description of parameter
   * @return {Promise<void>} description of return value
   */
  async updateSingleEvent(id: string, event: Event) {
    if (id) {
      let docRef = this.getSingleDocRef('events', id);
      updateDoc(docRef, this.getEventObject(event))
        .catch((err) => {
          console.error('Error updating event: ', err);
        })
        .then(() => {
          this.currentEvent = event;
        });
    } else {
      console.error('docId is null');
    }
  }

  // delete Single Object

    /**
   * A function to delete a single witness.
   *
   * @param {string} id - the ID of the witness to be deleted
   */
  async deleteSingleWitness(id: string) {
    if (id) {
      let docRef = this.getSingleDocRef('witnesses', id);
      await deleteDoc(docRef).catch((err) => {
        console.error('Error deleting witness: ', err);
      });
    }
  }

    /**
   * Deletes a single statement by its ID.
   *
   * @param {string} id - The ID of the statement to delete
   */
  async deleteSingleStatement(id: string) {
    if (id) {
      let docRef = this.getSingleDocRef('statements', id);
      await deleteDoc(docRef).catch((err) => {
        console.error('Error deleting statement: ', err);
      });
    }
  }

    /**
   * Delete a single event by ID.
   *
   * @param {string} id - the ID of the event to be deleted
   * @return {Promise<void>} a promise that resolves when the event is successfully deleted
   */
  async deleteSingleEvent(id: string) {
    if (id) {
      let docRef = this.getSingleDocRef('events', id);
      await deleteDoc(docRef).catch((err) => {
        console.error('Error deleting event: ', err);
      });
    }
  }

  //set whole List of Witnesses from Backend

    /**
   * This function subscribes to the list of witnesses and updates the local 'witnesses' array based on changes in the database.
   *
   * @return {void} 
   */
  subWitnessesList() {
    return onSnapshot(this.getColRef('witnesses'), (list) => {
      this.witnesses = [];
      let tempObj: any = {};
      list.forEach((element) => {
        tempObj = this.setWitnessObject(element.data(), element.id);
        if (element.id != element.data()['docId']) {
          tempObj.docId = element.id;
        }
        this.witnesses.push(this.setWitnessObject(tempObj, element.id));
      });
    });
  }

    /**
   * Retrieves a list of statements and subscribes to updates.
   *
   * @return {void} This function does not return a value.
   */
  subStatementsList() {
    return onSnapshot(this.getColRef('statements'), (list) => {
      this.statements = [];
      let tempObj: any = {};
      list.forEach((element) => {
        tempObj = this.setStatementObject(element.data(), element.id);
        if (element.id != element.data()['docId']) {
          tempObj.docId = element.id;
          this.statementId = element.id;
        }
        this.statements.push(this.setStatementObject(tempObj, element.id));
      });
    });
  }

    /**
   * A function that retrieves a list of sub-events.
   *
   * @param {} 
   * @return {} 
   */
  subEventsList() {
    return onSnapshot(this.getColRef('events'), (list) => {
      //leere die Liste
      this.events = [];
      let tempObj: any = {};
      list.forEach((element) => {
        //erstelle ein neues EventObjekt und fülle dieses mit den Daten aus der Datenbank
        tempObj = this.setEventObject(element.data(), element.id);
        //wenn die ID der Datenbank nicht die ID des Objekts ist, wird diese geändert
        if (element.id != element.data()['docId']) {
          tempObj.docId = element.id;
        }
        //füge das Objekt zum Array hinzu
        this.events.push(this.setEventObject(tempObj, element.id));
      });
    });
  }

    /**
   * Retrieves a single witness document based on the provided ID and sets the currentWitness property accordingly.
   *
   * @param {string} id - The ID of the witness document to retrieve.
   * @return {void} This function does not return anything directly.
   */
  subSingleWitness(id: string) {
    return onSnapshot(this.getSingleDocRef('witnesses', id), (element) => {
      this.currentWitness = this.setWitnessObject(element.data(), element.id); //Bei Interface
      this.currentWitness = new Witness(element.data()); //bei Class
    });
  }

    /**
   * Subscribes to a single statement by its ID and updates the current statement
   * whenever the data changes.
   *
   * @param {string} id - The ID of the statement to subscribe to.
   * @return {() => void} A function that can be called to unsubscribe from the snapshot updates.
   */
  subSingleStatement(id: string) {
    return onSnapshot(this.getSingleDocRef('statements', id), (element) => {
      // this.currentStatement = this.setStatementObject(
      //   element.data(),
      //   element.id
      // ); //Bei Interface
      this.currentStatement = new Statement(element.data()); //bei Class
    });
  }

    /**
   * A function that subscribes to a single event.
   *
   * @param {string} id - the ID of the event
   * @return {void} 
   */
  subSingleEvent(id: string) {
    return onSnapshot(this.getSingleDocRef('events', id), (element) => {
      this.currentEvent = this.setEventObject(element.data(), element.id); //Bei Interface
      this.currentEvent = new Event(element.data()); //bei Class
    });
  }

  //set New Objects

    /**
   * erstellt einen leeren, falls die Daten nicht vorhanden sind, um die Struktur des Objekts zu erhalten
   *
   * @param {any} obj - description of parameter
   * @param {string} id - description of parameter
   * @return {Object} description of return value
   */
  setWitnessObject(obj: any, id: string) {
    return {
      //erstellt einen leeren, falls die Daten nicht vorhanden sind, um die Struktur des Objekts zu erhalten
      docId: id,
      name: obj.name || 'Dummy Daten',
      address: obj.address || '',
      phone: obj.phone || '',
      role: obj.role || '',
      statements: obj.statements || [],
    };
  }

  
    /**
   * Sets the statement object with the given data and returns it.
   *
   * @param {any} obj - The object containing the data for the statement.
   * @param {string} id - The ID of the statement object.
   * @return {object} - The statement object with the provided data and ID.
   */
  setStatementObject(obj: any, id: string) {
    return {
      //erstellt einen leeren, falls die Daten nicht vorhanden sind, um die Struktur des Objekts zu erhalten
      docId: id,
      witness: obj.witness || '',
      event: obj.event || '',
      date: obj.date || '',
      time: obj.time || '',
      place: obj.place || '',
      comment: obj.comment || '',
      status: obj.status || '',
    };
  }

    /**
   * Sets the properties of an event object based on the provided object and ID.
   *
   * @param {any} obj - The object containing the properties of the event.
   * @param {string} id - The ID of the event.
   * @return {object} - The event object with the updated properties.
   */
  setEventObject(obj: any, id: string) {
    return {
      docId: id,
      date: obj.date || '',
      time: obj.time || '',
      place: obj.place || '',
      type: obj.type || '',
      description: obj.description || '',
      witnesses: obj.witnesses || [],
    };
  }

  //get single Object
  
    /**
   * A description of the entire function.
   *
   * @param {Witness} witness - description of parameter
   * @return {{}} description of return value
   */
  getWitnessObject(witness: Witness): {} {
    return {
      docId: witness.docId,
      name: witness.name,
      address: witness.address,
      phone: witness.phone,
      role: witness.role,
      statements: witness.statements,
    };
  }

    /**
   * A function that returns a statement object based on the provided statement.
   *
   * @param {Statement} statement - the statement to create the object from
   * @return {object} the statement object with specific properties
   */
  getStatementObject(statement: Statement): {} {
    return {
      docId: statement.docId,
      witness: statement.witness,
      event: statement.event,
      date: statement.date,
      time: statement.time,
      place: statement.place,
      comment: statement.comment,
      status: statement.status,
    };
  }

    /**
   * Returns an object containing the properties of the given event.
   *
   * @param {Event} event - The event object to extract properties from.
   * @return {{}} An object containing the properties of the event.
   */
  getEventObject(event: Event): {} {
    return {
      docId: event.docId,
      date: event.date,
      time: event.time,
      place: event.place,
      type: event.type,
      description: event.description,
      witnesses: event.witnesses,
    };
  }

  //get Lists of Objects

  /**
   * Get the witnesses list.
   *
   * @return {Witness[]} the list of witnesses
   */
  getWitnessesList(): Witness[] {
    return this.witnesses;
  }

    /**
   * Get the list of statements.
   *
   * @return {Statement[]} the list of statements
   */
  getStatementsList(): Statement[] {
    return this.statements;
  }

    /**
   * Retrieves the list of events.
   *
   * @return {Event[]} The list of events
   */
  getEventsList(): Event[] {
    return this.events;
  }

  //get single Object, find by docId

    /**
   * Get a single witness by document ID.
   *
   * @param {string} docId - The document ID of the witness
   * @return {any} The found witness or undefined if not found
   */
  getSingleWitness(docId: string) {
    return this.witnesses.find((element) => element.docId == docId);
  }

    /**
   * Retrieves a single statement from the list of statements based on the provided document ID.
   *
   * @param {string} docId - The document ID of the statement to retrieve.
   * @return {Statement | undefined} The statement with the matching document ID, or undefined if not found.
   */
  getSingleStatement(docId: string) {
    return this.statements.find((element) => element.docId == docId);
  }

    /**
   * Returns the event object with the specified document ID.
   *
   * @param {string} docId - The ID of the document to retrieve.
   * @return {Event | undefined} The event object with the specified document ID, or undefined if not found.
   */
  getSingleEvent(docId: string) {
    return this.events.find((element) => element.docId == docId);
  }

  //syntax for firestore
  //greift auf die Collection zu, alle Docs als Liste

    /**
   * Returns a reference to a collection in Firestore based on the provided collection ID.
   *
   * @param {string} colId - The ID of the collection to retrieve a reference to.
   * @return {CollectionReference} A reference to the specified collection in Firestore.
   */
  getColRef(colId: string) {
    return collection(this.firestore, colId);
  }
  // //greift auf ein einzelnes Doc zu
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}