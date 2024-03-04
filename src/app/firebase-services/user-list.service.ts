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
import { User } from '../../models/user.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  loading: boolean = false;
  //Array um die Daten lokal zwischen zu speichern
  normalUsers: User[];
  userId: string | null = inject(ActivatedRoute).snapshot.paramMap.get('id');
  currentUser: User = new User();
  //Variablen um die Daten in Firestore zu speichern
  unSubUsers; //Alle
  unSubSingleUser; // Um auf einzelne Docs zu zugreifen

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.normalUsers = [];
    this.unSubUsers = this.subUsersList();

    //     //Observer um auf Änderungen reagieren zu können und die Daten auf firebase zu aktualisieren
    this.unSubSingleUser = onSnapshot(
      // users - Name von Collection, Bjrt8zYaSkCKZEWu09y1 - DocId vom ersten element
      //greift drauf zu auch wenn Datenbank leer ist.
      this.getSingleDocRef('users', 'PRgrM5ZikZoNXdMqG8hE'),
      (element) => {
        this.currentUser = this.setUserObject(element.data(), element.id);
        console.log('unSubSingleUser: ', this.currentUser);
        // console.log('unSubSingleUser: ', this.setUserObject(element.data(), element.id));
      }
    );
  }

  subSingleUser(id: string) {
    return onSnapshot(this.getSingleDocRef('users', id), (element) => {
      this.currentUser = new User(element.data());
    })
  }

  async addUser(user: User) {
    //fügt die Daten von user in die Sammlung users
    // und speichert sie in der Datenbank asyncron.
    //Auf alles andere muss gewartet werden bis User hinzugefügt ist.
    user.docId = user.docId!;
    await addDoc(this.getUsersRef(), user)
      .catch((error) => {
        console.error('Error adding user: ', error);
      })
      .then((docRef) => {
        //erstellt ein neues Doc mit ID
        this.normalUsers.push(this.setUserObject(user, docRef?.id as string));
        console.log(
          'Document written with ID: ',
          this.normalUsers[this.normalUsers.length - 1].docId
        );
      });
  }

  updateUsersList() {
    //aktualisiert die Daten in der Sammlung

    this.normalUsers.forEach((element) => {
      if(element.docId)
      this.updateSingleUser(element.docId, element);
    });

    console.log('updateUsersList: ', this.normalUsers);
  }

  async updateSingleUser(id:string,user: User) {
    if (user.docId) {
      let docRef = this.getSingleDocRef('users', id);
      await updateDoc(docRef, this.getCleanJson(user)).catch((err) => {
        console.error('Error updating user: ', err);
      }).then(() => {
        this.currentUser = user;
        console.log('User updated: ', user);
        this.loading = false;
      });
    } else {
      console.error('docId is null');
    }
  }

  getCleanJson(user: User): {} {
    return {
      docId: user.docId,
      name: user.name,
      email: user.email,
      capacity: user.capacity,
      trails: user.trails,
    };
  }

  //   //kappt die Verbindung zu Firebase, bzw. von den Observables ??
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSubUsers();
    this.unSubSingleUser();
    this.subSingleUser(this.userId!);
  }

  subUsersList() {
    return onSnapshot(this.getUsersRef(), (list) => {
      this.normalUsers = [];
      let tempUser: any = {};
      list.forEach((element) => {
        tempUser = this.setUserObject(element.data(), element.id);
        if (element.id != element.data()['docId']) {
          tempUser.docId = element.id;
          console.log('changed docID: ', element.data()['docId'], element.id);
        }
        this.normalUsers.push(this.setUserObject(tempUser, element.id));
      });
      console.log('normalUsers: ', this.normalUsers);
    });
  }

  setUserObject(obj: any, id: string): User {
    return {
      //erstellt einen leeren, falls die Daten nicht vorhanden sind, um die Struktur des Objekts zu erhalten
      docId: id,
      name: obj.name || '',
      email: obj.email || '',
      capacity: obj.capacity || true,
      trails: obj.trails || [],
    };
  }



  getUsersList() {
    console.log('getUsersList: ', this.normalUsers);
    
    return this.normalUsers;
  }

  getSingleUser(docId: string) {
   return this.normalUsers.find((element) => element.docId == docId);
    //  return await this.currentUser.toString();
  }

    // //greift auf die Collection zu, alle Docs als Liste
    getUsersRef() {
      return collection(this.firestore, 'users');
    }
  // //greift auf ein einzelnes Doc zu
  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
