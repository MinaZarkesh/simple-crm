import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { User } from '../../../../models/user.class';
// //Firebase-Services
// import { UserListService } from '../../../firebase-services/firebase.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    FirestoreModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    NgIf,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent implements OnInit {
  @Output() userAdded: EventEmitter<boolean> = new EventEmitter();
  //  @Input() currentUser!: User;
user = {
  docId: '1',
  name: 'John Doe',
  
  address: 'Musterstraße 1, 30657 Hannover',
  phone: '01234567890',
  role: 'Opfer',
  statements: [
    'statement_id1',
    'statement_id2',
    'statement_id3',
    'statement_id4',
  ]
};
//User[]
dummyWitnessses: any[] = [
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

dummyStatements: any[] = [
  {
    docId: 'statement_id1',
    user: 'Zeuge_id1',
    event: 'event_id1',
    date: '23.03.2022',
    time: '15:15',
    place: 'Polizei Dienststelle Hannover',
    comment: 'Hier steht ein längerer Text, das soll die Aussage selbst sein',
    status: 'austehend',
  },
  {
    docId: 'statement_id2',
    user: 'Zeuge_id1',
    event: 'event_id2',
    date: '23.03.2022',
    time: '15:15',
    place: 'Polizei Dienststelle Hannover',
    comment: 'Hier steht ein längerer Text, das soll die Aussage selbst sein',
    status: 'bestätigt',
  },
  {
    docId: 'statement_id3',
    user: 'Zeuge_id1',
    event: 'event_id3',
    date: '23.03.2022',
    time: '15:15',
    place: 'Polizei Dienststelle Hannover',
    comment: 'Hier steht ein längerer Text, das soll die Aussage selbst sein',
    status: 'im Prozess',
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
      'Der verdächtige Mann hatte einen Unfall, während er zu fliehen versuchte.',
    users: ['Zeuge_id1', 'Zeuge_id8', 'Zeuge_id9'],
  },
  {
    docId: 'event_id2',
    date: '23.03.2022',
    time: '14:45',
    place: 'Hannover',
    type: 'Verbrechen',
    description: 'Ein Raubüberfall fand in der Musterstraße 1 statt.',
    users: ['Zeuge_id1', 'Zeuge_id2', 'Zeuge_id3'],
  },
  {
    docId: 'event_id3',
    date: '23.03.2022',
    time: '15:00',
    place: 'Hannover',
    type: 'Beobachtung',
    description:
      'Ein verdächtiger Mann wurde in der Nähe des Tatorts gesehen.',
    users: ['Zeuge_id4', 'Zeuge_id5', 'Zeuge_id6'],
  },
];

  loading: boolean = false;
  trails: any = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    // private userService: UserListService //
  ) {}

  ngOnInit(): void {}

  // getList():
  // //  User[] 
  //  {
  //   // return this.userService.normalUsers;
  // }

  // async saveUser() {
  //   // this.loading = true;
  //   // this.user.statements = this.trails.value;
  //   // // this.currentUser.capacity = this.capacity;
  //   // let user: User = {
  //   //   docId: '',
  //   //   name: this.user.name,
  //   //   address: this.user.address,
  //   //   phone: this.user.phone,
  //   //   role: this.user.role,
  //   //   statements: this.user.statements,
  //   // };

  //   // console.log(this.user);

  //   // await this.userService.addUser(user);
  //   // user =
  //   //   this.userService.normalUsers[this.userService.normalUsers.length - 1];
  //   // if (user.docId) await this.userService.updateSingleUser(user.docId, user);
  //   // // this.getList();
  //   // this.loading = false;

  //    let test: any = this.getList();

  //   this.dialogRef.close();
  // }
}
