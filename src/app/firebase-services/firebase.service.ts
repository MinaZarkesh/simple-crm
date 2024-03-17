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

  // dummyWitnessList: Witness[] = [
  //   {
  //     docId: 'zeuge_id01',
  //     name: 'John Doe',
  //     address: 'Beispielweg 2, 30159 Hannover',
  //     phone: '0123456789',
  //     statements: ['statement_id01', 'statement_id02', 'statement_id03'],
  //     role: 'Tatverdächtiger',
  //   },
  //   {
  //     docId: 'zeuge_id02',
  //     name: 'Jane Doe',
  //     address: 'Beispielweg 2, 30159 Hannover',
  //     phone: '0987654321',
  //     statements: ['statement_id04', 'statement_id05'],
  //     role: 'Opfer',
  //   },
  //   {
  //     docId: 'zeuge_id03',
  //     name: 'Max Mustermann',
  //     address: 'Beispielweg 2, 30159 Hannover',
  //     phone: '05111234567',
  //     statements: ['statement_id06'],
  //     role: 'Nachbar',
  //   },
  //   {
  //     docId: 'zeuge_id04',
  //     name: 'Erika Mustermann',
  //     address: 'Beispielweg 2, 30159 Hannover',
  //     phone: '05117654321',
  //     statements: ['statement_id07', 'statement_id08'],
  //     role: 'Nachbarin',
  //   },
  //   {
  //     docId: 'zeuge_id05',
  //     name: 'Johannes Schmidt',
  //     address: 'Beispielweg 3, 30159 Hannover',
  //     phone: '05112345678',
  //     statements: ['statement_id10'],
  //     role: 'Augenzeuge',
  //   },
  //   {
  //     docId: 'zeuge_id06',
  //     name: 'Maria Musterfrau',
  //     address: 'Beispielweg 4, 30159 Hannover',
  //     phone: '05119876543',
  //     statements: ['statement_id09'],
  //     role: 'Nachbarin',
  //   },
  //   {
  //     docId: 'zeuge_id07',
  //     name: 'Lukas Beispiel',
  //     address: 'Beispielparkweg 1, 30165 Hannover',
  //     phone: '05112345678',
  //     statements: ['statement_id12'],
  //     role: 'Finder des Pakets',
  //   },
  //   {
  //     docId: 'zeuge_id08',
  //     name: 'Anna Schmitz',
  //     address: 'Beispielparkweg 1, 30165 Hannover',
  //     phone: '05118765432',
  //     statements: ['statement_id11'],
  //     role: 'Anruferin vom Fund des Pakets',
  //   },
  // ];

  // dummyStatementsList: Statement[] = [
  //   {
  //     docId: 'statement_id01',
  //     witness: 'zeuge_id01',
  //     event: 'event_id01',
  //     date: '12.04.2022',
  //     time: '18:30',
  //     place: 'Beispielweg 2, 30159 Hannover',
  //     comment:
  //       'Der Streit eskalierte sehr schnell, aber es wurde niemand verletzt.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id04',
  //     witness: 'zeuge_id02',
  //     event: 'event_id01',
  //     date: '12.04.2022',
  //     time: '18:30',
  //     place: 'Beispielweg 2, 30159 Hannover',
  //     comment: 'Es war nicht so schlimm, es wurde ja niemand verletzt.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id06',
  //     witness: 'zeuge_id03',
  //     event: 'event_id01',
  //     date: '12.04.2022',
  //     time: '18:45',
  //     place: 'Beispielweg 2, 30159 Hannover',
  //     comment:
  //       'Ich hörte laute Stimmen, konnte aber nicht verstehen, worum es ging.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id02',
  //     witness: 'zeuge_id01',
  //     event: 'event_id02',
  //     date: '18.04.2022',
  //     time: '13:30',
  //     place: 'Beispielweg 2, 30159 Hannover',
  //     comment: 'Ich habe die Waffe nur zu meiner eigenen Sicherheit gekauft.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id07',
  //     witness: 'zeuge_id04',
  //     event: 'event_id02',
  //     date: '18.04.2022',
  //     time: '11:50',
  //     place: 'Beispielweg 2, 30159 Hannover',
  //     comment:
  //       'Ich habe meinen Nachbarn gesehen, wie er aus dem Waffenladen kam.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id08',
  //     witness: 'zeuge_id04',
  //     event: 'event_id03',
  //     date: '17.04.2022',
  //     time: '14:50',
  //     place: 'Beispielparkweg 1, 30165 Hannover',
  //     comment: 'Der Knall war so laut, dass ich dachte, es wäre ein Feuerwerk.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id05',
  //     witness: 'zeuge_id03',
  //     event: 'event_id04',
  //     date: '15.04.2022',
  //     time: '08:15',
  //     place: 'Beispielweg 4, 30159 Hannover',
  //     comment: 'Sie schien gestern Abend sehr aufgeregt und besorgt zu sein.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id10',
  //     witness: 'zeuge_id05',
  //     event: 'event_id04',
  //     date: '17.04.2022',
  //     time: '13:50',
  //     place: 'Beispielweg 4, 30159 Hannover',
  //     comment:
  //       'Ich habe sie seit gestern Abend nicht mehr gesehen. Ich mache mir Sorgen, dass ihr was zugestoßen ist.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id03',
  //     witness: 'zeuge_id01',
  //     event: 'event_id05',
  //     date: '19.04.2022',
  //     time: '21:45',
  //     place: 'Polizeidienststelle 2, 30159 Hannover',
  //     comment: 'Ich verweigere die Aussage',
  //     status: 'verweigert',
  //   },
  //   {
  //     docId: 'statement_id09',
  //     witness: 'zeuge_id06',
  //     event: 'event_id05',
  //     date: '17.04.2022',
  //     time: '13:50',
  //     place: 'Beispielparkweg 1, 30165 Hannover',
  //     comment:
  //       'Er schien sich zu beeilen und blickte sich nervös um, als er das Paket verlud.',
  //     status: 'abgegeben',
  //   },

  //   {
  //     docId: 'statement_id11',
  //     witness: 'zeuge_id08',
  //     event: 'event_id6',
  //     date: '17.04.2022',
  //     time: '13:50',
  //     place: 'Beispielparkweg 1, 30165 Hannover',
  //     comment:
  //       'Das Paket war auffällig platziert, fast so, als ob es jemand finden sollte.',
  //     status: 'abgegeben',
  //   },
  //   {
  //     docId: 'statement_id12',
  //     witness: 'zeuge_id07',
  //     event: 'event_id6',
  //     date: '17.04.2022',
  //     time: '13:50',
  //     place: 'Beispielparkweg 1, 30165 Hannover',
  //     comment:
  //       'Ich habe gleich gesehen, dass etwas nicht stimmte und habe den Fund des Pakets sofort gemeldet.',
  //     status: 'abgegeben',
  //   },
  // ];

  // dummyEventList: Event[] = [
  //   {
  //     docId: 'event_id01',
  //     date: '12.04.2022',
  //     time: '18:00',
  //     place: 'Hannover',
  //     description: 'Ein Streit zwischen dem Nachbarspaar wurde gemeldet.',
  //     type: 'Streit',
  //     witnesses: ['zeuge_id01', 'zeuge_id02', 'zeuge_id03'],
  //   },
  //   {
  //     docId: 'event_id02',
  //     date: '13.04.2022',
  //     time: '19:30',
  //     place: 'Hannover',
  //     description:
  //       'Der Nachbarsmann wurde gesehen, wie er eine Schusswaffe kaufte.',
  //     type: 'Waffenkauf',
  //     witnesses: ['zeuge_id01', 'zeuge_id04'],
  //   },
  //   {
  //     docId: 'event_id03',
  //     date: '14.04.2022',
  //     time: '22:15',
  //     place: 'Hannover',
  //     description:
  //       'Ein lauter Knall wurde aus der Wohnung des Nachbarspaares gehört.',
  //     type: 'Lärmbelästigung',
  //     witnesses: ['zeuge_id04'],
  //   },
  //   {
  //     docId: 'event_id04',
  //     date: '15.04.2022',
  //     time: '08:00',
  //     place: 'Hannover',
  //     description:
  //       'Die Nachbarsfrau wurde seit dem Vorabend nicht mehr gesehen.',
  //     type: 'Vermisstenfall',
  //     witnesses: ['zeuge_id05', 'zeuge_id03'],
  //   },
  //   {
  //     docId: 'event_id05',
  //     date: '16.04.2022',
  //     time: '10:30',
  //     place: 'Hannover',
  //     description:
  //       'Der Nachbarsmann wurde beobachtet, wie er ein großes Paket ins Auto brachte.',
  //     type: 'Verdächtige Aktivität',
  //     witnesses: ['zeuge_id01', 'zeuge_id06'],
  //   },
  //   {
  //     docId: 'event_id06',
  //     date: '17.04.2022',
  //     time: '13:45',
  //     place: 'Hannover',
  //     description: 'Ein großes Paket wurde am Rand eines Parks gefunden.',
  //     type: 'Leichenfund',
  //     witnesses: ['zeuge_id07', 'zeuge_id08'],
  //   },
  // ];

  //roles:
  

  roles: Role[] = [
    { value: 'opfer-0', viewValue: 'Opfer' },
    { value: 'verdaechtiger-1', viewValue: 'Verdächtiger' },
    { value: 'beobachter-2', viewValue: 'Beobachter' },
    { value: 'sontiges-3', viewValue: 'Sonstiges' },
  ];

  // userId: string | null = inject(ActivatedRoute).snapshot.paramMap.get('id');
  witnessId = 'PRgrM5ZikZoNXdMqG8hE';
  statementId = 'PRgrM5ZikZoNXdMqG8hE';
  eventId = 'PRgrM5ZikZoNXdMqG8hE';
  //Lists
  unSubWitnesses;
  unSubStatements;
  unSubEvents;
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

    
    // if(this.witnesses.length == 0){
      //  this.addWitnessList();
      //  this.addStatementList();
    //  this.addEventList()
    // }
    
    //connect to firebase with onSnapshot
    this.unSubWitnesses = this.subWitnessesList();
    this.unSubStatements = this.subStatementsList();
    this.unSubEvents = this.subEventsList();

    //  this.unSubSingleWitness = this.subSingleWitness(this.witnessId);
    //  this.unSubSingleStatement = this.subSingleStatement(this.statementId);
    //  this.unSubSingleEvent = this.subSingleEvent(this.eventId);
  }

  //   //kappt die Verbindung zu Firebase, bzw. von den Observables ??
  ngOnDestroy(): void {
    this.unSubWitnesses();
    this.unSubStatements();
    this.unSubEvents();
    // this.unSubSingleWitness();
    // this.unSubSingleStatement();
    // this.unSubSingleEvent();
  }

  // async addWitnessList() {
  //   await this.dummyWitnessList.forEach((element) => {
  //     this.addWitness(element);
  //   });
  // }

  // async addStatementList() {
  //   await this.dummyStatementsList.forEach((element) => {
  //     this.addStatement(element);
  //   });
  // }

  // async addEventList() {
  //   await this.dummyEventList.forEach((element) => {
  //     this.addEvent(element);
  //   });
  // }

  //add Objects
  async addWitness(witness: Witness) {
     witness.docId = witness.docId!;
    await addDoc(this.getColRef('witnesses'), witness)
      .catch((error) => {
        console.error('Error adding witness: ', error);
      })
      .then((docRef) => {
        //erstellt ein neues Doc mit ID
        // this.witnesses.push(
        //   this.setWitnessObject(witness, docRef?.id as string)
        // );
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
        // this.statements.push(
        //   this.setStatementObject(statement, docRef?.id as string)
        // );
        console.log(
          'Document written with ID: ',
          docRef?.id as string
        );
        this.statementId = docRef?.id as string;
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
        console.log(
          'Document written with ID: ',
          this.events[this.events.length - 1].docId
        );
      });
  }

  //update ObjectLists //warum hat async kein Effekt hier?
 async updateWitnessList() {
    //aktualisiert die Daten in der Sammlung
    await this.witnesses.forEach((element) => {
      if (element.docId)  this.updateSingleWitness(element.docId, element);
    });
    console.log('updateWitnessList: ', this.witnesses);
  }

 async updateStatementList() {
  await  this.statements.forEach((element) => {
      if (element.docId) this.updateSingleStatement(element.docId, element);
    });
    console.log('updateStatementList: ', this.statements);
  }

 async  updateEventList() {
   await this.events.forEach((element) => {
      if (element.docId) this.updateSingleEvent(element.docId, element);
    });
    console.log('updateEventList: ', this.events);
  }

  //updateSingleObject
  async updateSingleWitness(id: string, witness: Witness) {
    if (id) {
      let docRef = this.getSingleDocRef('witnesses', id);
      console.log("updateSingleWitness.fireService: ", this.currentWitness);
      
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
    }
  }

  // delete Single Object
  async deleteSingleWitness(id: string) {
    if (id) {
      let docRef = this.getSingleDocRef('witnesses', id);
      await deleteDoc(docRef).catch((err) => {
        console.error('Error deleting witness: ', err);
      });
    }
  }

  async deleteSingleStatement(id: string) {
    if (id) {
      let docRef = this.getSingleDocRef('statements', id);
      await deleteDoc(docRef).catch((err) => {
        console.error('Error deleting statement: ', err);
      });
    }
  }

  async deleteSingleEvent(id: string) {
    if (id) {
      let docRef = this.getSingleDocRef('events', id);
      await deleteDoc(docRef).catch((err) => {
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
          // console.log(
          //   'changed docID of Witness: ',
          //   element.data()['docId'],
          //   element.id
          // );
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
          this.statementId = element.id;
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
          // console.log(
          //   'changed docID of Event: ',
          //   element.data()['docId'],
          //   element.id
          // );
        }
        //füge das Objekt zum Array hinzu
        this.events.push(this.setEventObject(tempObj, element.id));
      });
      console.log('events: ', this.events);
    });
  }
  subSingleWitness(id: string) {
    return onSnapshot(this.getSingleDocRef('witnesses', id), (element) => {
      this.currentWitness = this.setWitnessObject(element.data(), element.id); //Bei Interface
      this.currentWitness = new Witness(element.data()); //bei Class
    });
  }

  subSingleStatement(id: string) {
    return onSnapshot(this.getSingleDocRef('statements', id), (element) => {
      this.currentStatement = this.setStatementObject(
        element.data(),
        element.id
      ); //Bei Interface
      this.currentStatement = new Statement(element.data()); //bei Class
    });
  }

  subSingleEvent(id: string) {
    return onSnapshot(this.getSingleDocRef('events', id), (element) => {
      this.currentEvent = this.setEventObject(element.data(), element.id); //Bei Interface
      this.currentEvent = new Event(element.data()); //bei Class
    });
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
    };
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
    };
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
    };
  }

  //get Lists of Objects
  getWitnessesList(): Witness[] {
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