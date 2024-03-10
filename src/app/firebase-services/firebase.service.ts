import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  DocumentData,
  getDoc,
} from '@angular/fire/firestore';
import { Witness } from '../../models/witness.class';
import { Statement } from '../../models/statement.class';
import { Event } from '../../models/event.class';
// import { ActivatedRoute } from '@angular/router';

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
  // normalUsers: User[];
  // currentUser: User = new User();
  //Variablen um die Daten in Firestore zu speichern
  witnesses: Witness[] = []; //Zeugen
  statements: Statement[] = []; // Zeugenaussagen
  events: Event[] = []; // Ereignisse
  currentWitness: Witness = new Witness();
  currentStatement: Statement = new Statement();
  currentEvent: Event = new Event();
  

  //roles:
   roles: Role[] = [
    {value: 'opfer-0', viewValue: 'Opfer'},
    {value: 'taeter-1', viewValue: 'Täter'},
    {value: 'beobachter-2', viewValue: 'Beobachter'},
  ];


  // userId: string | null = inject(ActivatedRoute).snapshot.paramMap.get('id');
  witnessId = 'PRgrM5ZikZoNXdMqG8hE';
  statementId = 'PRgrM5ZikZoNXdMqG8hE';
  eventId = 'PRgrM5ZikZoNXdMqG8hE';
  //Lists
  // unSubWitnesses; 
  // unSubStatements; 
  // unSubEvents; 
  // //Singles
  // unSubSingleWitness;
  // unSubSingleStatement; 
  // unSubSingleEvent; 

  // unSubUsers; //Alle
  // unSubSingleUser; // Um auf einzelne Docs zu zugreifen

  firestore: Firestore = inject(Firestore);

  constructor() {
    //Arrays initialisieren
    this.witnesses = [];
    this.statements = [];
    this.events = [];
    
    // this.normalUsers = [];
    //connect to firebase with onSnapshot

    // this.unSubWitnesses = this.subWitnessesList();
    // this.unSubStatements = this.subStatementsList();
    // this.unSubEvents = this.subEventsList();
    
    //  this.unSubSingleWitness = this.subSingleWitness(this.witnessId);
    //  this.unSubSingleStatement = this.subSingleStatement(this.statementId);
    //  this.unSubSingleEvent = this.subSingleEvent(this.eventId);
 
    }

 //   //kappt die Verbindung zu Firebase, bzw. von den Observables ??
 ngOnDestroy(): void {

  // this.unSubWitnesses();
  // this.unSubStatements();
  // this.unSubEvents();
  // this.unSubSingleWitness();
  // this.unSubSingleStatement();
  // this.unSubSingleEvent();
}

//add Objects
async addWitness(witness: Witness) {
  witness.docId = witness.docId!;
  await addDoc(this.getColRef('witnesses'), witness)
    .catch((error) => {
      console.error('Error adding witness: ', error);
    })
    .then((docRef) => {
      //erstellt ein neues Doc mit ID
      this.witnesses.push(this.setWitnessObject(witness, docRef?.id as string));
      console.log(
        'Document written with ID: ',
        this.witnesses[this.witnesses.length - 1].docId
      );
    });
}

async addStatement(statement: Statement) {
  statement.docId = statement.docId!;
  await addDoc(this.getColRef('statements'), statement)
  .catch((error) => {
    console.error('Error adding statement: ', error);
  })
  .then((docRef) => {
    //erstellt ein neues Doc mit ID
    this.statements.push(this.setStatementObject(statement, docRef?.id as string));
    console.log( 'Document written with ID: ', this.statements[this.statements.length - 1].docId);
  });
}

async addEvent(event: Event) {
  event.docId = event.docId!;
  await addDoc(this.getColRef('events'), event)
  .catch((error) => {
    console.error('Error adding event: ', error);
  })
  .then((docRef) => {
    //erstellt ein neues Doc mit ID
    this.events.push(this.setEventObject(event, docRef?.id as string));
    console.log(  'Document written with ID: ', this.events[this.events.length - 1].docId);
  });
}

//update ObjectLists //warum hat async kein Effekt hier?
  updateWitnessList() {
    //aktualisiert die Daten in der Sammlung
     this.witnesses.forEach((element) => {
      if (element.docId)  this.updateSingleWitness(element.docId, element);
    });
    console.log('updateWitnessList: ', this.witnesses);
  }

  updateStatementList() {
    this.statements.forEach((element) => {
      if (element.docId) this.updateSingleStatement(element.docId, element);
    });
    console.log('updateStatementList: ', this.statements);
  }

  updateEventList() {
    this.events.forEach((element) => {
      if (element.docId) this.updateSingleEvent(element.docId, element);
    });
    console.log('updateEventList: ', this.events);
  }

//updateSingleObject
  async updateSingleWitness(id: string, witness: Witness) {
    if (id) {
      let docRef = this.getSingleDocRef('witnesses', id);
      await updateDoc(docRef, this.getWitnessObject(witness))
        .catch((err) => {
          console.error('Error updating witness: ', err);
        })
        .then(() => {
          this.currentWitness = witness;
          console.log('Witness updated: ', witness);
        });
    } else {
      console.error('docId is null');
    }
  }

  async updateSingleStatement(id: string, statement: Statement) {
    if (id) {
      let docRef = this.getSingleDocRef('statements', id);
      updateDoc(docRef, this.getStatementObject(statement))
        .catch((err) => {
          console.error('Error updating statement: ', err);
        })
        .then(() => {
          this.currentStatement = statement;
          console.log('Statement updated: ', statement);
        });
      } else {
        console.error('docId is null');
      }

  }

  async updateSingleEvent(id: string, event: Event) {
    if (id) {
      let docRef = this.getSingleDocRef('events', id);
      updateDoc(docRef, this.getEventObject(event))
        .catch((err) => {
          console.error('Error updating event: ', err);
        })
        .then(() => {
          this.currentEvent = event;
          console.log('Event updated: ', event);
        });
    } else {
      console.error('docId is null');
    };
  }

  // delete Single Object
  async deleteSingleWitness(id: string) {
    if (id) {
      let docRef = this.getSingleDocRef('witnesses', id);
      await deleteDoc(docRef)
      .catch((err) => {
        console.error('Error deleting witness: ', err);
      });
    }
  }

  async deleteSingleStatement(id:string){
    if(id){
      let docRef = this.getSingleDocRef('statements', id);
      await deleteDoc(docRef)
      .catch((err) => {
        console.error('Error deleting statement: ', err);
      });
    }
  }

  async deleteSingleEvent(id:string){
    if(id){
      let docRef = this.getSingleDocRef('events', id);
      await deleteDoc(docRef)
      .catch((err) => {
        console.error('Error deleting event: ', err);
      });
    }
  }


  //set whole List of Witnesses from Backend
  subWitnessesList() {
    return onSnapshot(this.getColRef('witnesses'), (list) => {
      this.witnesses = [];
      let tempObj: any = {};
      list.forEach((element) => {
        tempObj = this.setWitnessObject(element.data(), element.id);
        if (element.id != element.data()['docId']) {
          tempObj.docId = element.id;
          console.log(
            'changed docID of Witness: ',
            element.data()['docId'],
            element.id
          );
        }
        this.witnesses.push(this.setWitnessObject(tempObj, element.id));
      });
      console.log('witnesses: ', this.witnesses);
    });
  }

  subStatementsList() {
    return onSnapshot(this.getColRef('statements'), (list) => {
      this.statements = [];
      let tempObj: any = {};
      list.forEach((element) => {
        tempObj = this.setStatementObject(element.data(), element.id);
        if (element.id != element.data()['docId']) {
          tempObj.docId = element.id;
          console.log(
            'changed docID of Statement: ',
            element.data()['docId'],
            element.id
          );
        }
        this.statements.push(this.setStatementObject(tempObj, element.id));
      });
      console.log('statements: ', this.statements);
    });
  }

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
          console.log(
            'changed docID of Event: ',
            element.data()['docId'],
            element.id
          );
        }
        //füge das Objekt zum Array hinzu
        this.events.push(this.setEventObject(tempObj, element.id));
      });
      console.log('events: ', this.events);
    });
  }
  subSingleWitness(id: string) {
    return onSnapshot(
      this.getSingleDocRef('witnesses', id), (element)=>{
        this.currentWitness = this.setWitnessObject(element.data(), element.id); //Bei Interface
        this.currentWitness = new Witness(element.data()); //bei Class
      }
    )
  }

  subSingleStatement(id: string) {
    return onSnapshot(
      this.getSingleDocRef('statements', id), (element)=>{
        this.currentStatement = this.setStatementObject(element.data(), element.id); //Bei Interface
        this.currentStatement = new Statement(element.data()); //bei Class
      }
    )
  }

  subSingleEvent(id: string) {
    return onSnapshot(
      this.getSingleDocRef('events', id), (element)=>{
        this.currentEvent = this.setEventObject(element.data(), element.id); //Bei Interface
        this.currentEvent = new Event(element.data()); //bei Class
      }
    )
  }

  //set New Objects
  setWitnessObject(obj: any, id: string) {
    return {
      //erstellt einen leeren, falls die Daten nicht vorhanden sind, um die Struktur des Objekts zu erhalten
      docId: id,
      name: obj.name || '',
      address: obj.address || '',
      phone: obj.phone || '',
      role: obj.role || '',
      statements: obj.statements || [],
    };
  }

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

  //CleanJSONUser Objects 
  //get single Object
  getWitnessObject(witness: Witness): {} {
    return {
      docId: witness.docId,
      name: witness.name,
      address: witness.address,
      phone: witness.phone,
      role: witness.role,
      statements: witness.statements,
    }
  }

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
    }
  }

  getEventObject(event: Event): {} {
    return {
      docId: event.docId,
      date: event.date,
      time: event.time,
      place: event.place,
      type: event.type,
      description: event.description,
      witnesses: event.witnesses,
    }
  }

  //get Lists of Objects
  getWitnessesList(): Witness[] {
    console.log('getWitnessesList: ', this.witnesses);
    return this.witnesses;
  }

  getStatementsList(): Statement[] {
    console.log('getStatementsList: ', this.statements);
    return this.statements;
  }

  getEventsList(): Event[] {
    console.log('getEventsList: ', this.events);
    return this.events;
  }

  //get single Object, find by docId
  getSingleWitness(docId: string) {
    return this.witnesses.find((element) => element.docId == docId);
  }

  getSingleStatement(docId: string) {
    return this.statements.find((element) => element.docId == docId);
  }

  getSingleEvent(docId: string) {
    return this.events.find((element) => element.docId == docId);
  }

  //syntax for firestore
  //greift auf die Collection zu, alle Docs als Liste
  getColRef(colId: string) {
    return collection(this.firestore, colId);
  }
  // //greift auf ein einzelnes Doc zu
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}