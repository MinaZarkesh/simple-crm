import { Component, OnInit} from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-edit-user',
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
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  loading = false;
  user!: User;


  userId!: string;
  trails: any = new FormControl('');

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

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private userService: UserListService
  ) {}

  ngOnInit(): void {
    console.log('ngInit edit: ', this.user);
  }

 async  saveEdits() {
  this.loading = true;
    await this.userService.updateSingleUser(this.userId, this.user);
   
    console.log('saveUser: ', this.user);
    this.loading = false;
     this.dialogRef.close();
  }
}
