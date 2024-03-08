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
import { User } from '../../../../models/user.class';
//Firebase-Services
import { UserListService } from '../../../firebase-services/user-list.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';
// import { Observable } from 'rxjs';
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
   @Input() currentUser!: User;
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

  dummyUsers: User[] = [
    {
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
      ],
    },
    {
      docId: '2',
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
      docId: '3',
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

  loading: boolean = false;
  trails: any = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserListService //
  ) {}

  ngOnInit(): void {}

  getList(): User[] {
    return this.userService.normalUsers;
  }

  async saveUser() {
    this.loading = true;
    this.user.statements = this.trails.value;
    // this.currentUser.capacity = this.capacity;
    let user: User = {
      docId: '',
      name: this.user.name,
      address: this.user.address,
      phone: this.user.phone,
      role: this.user.role,
      statements: this.user.statements,
    };

    console.log(this.user);

    await this.userService.addUser(user);
    user =
      this.userService.normalUsers[this.userService.normalUsers.length - 1];
    if (user.docId) await this.userService.updateSingleUser(user.docId, user);
    // this.getList();
    this.loading = false;

    // let test: any = this.getList();

    this.dialogRef.close();
  }
}
