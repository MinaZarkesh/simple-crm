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
import { User } from '../../models/user.interface';
//Firebase-Services
import { UserListService } from '../firebase-services/user-list.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';
// import { Observable } from 'rxjs';
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
  user: User = {
    docId: '',
    name: '',
    email: '',
    capacity: true,
    trails: ['Spur 1', 'Spur 2', 'Spur 3', 'Spur 4', 'Spur 5', 'Spur 6'],
  };
  tempUser: any = {};

  userId: string = this.userService.userId!;
  // editUser: User = {
  //   docId: '',
  //   name: '',
  //   email: '',
  //   capacity: true,
  //   trails: ['Spur 1', 'Spur 2', 'Spur 3', 'Spur 4', 'Spur 5', 'Spur 6'],
  // };
  trails: any = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private userService: UserListService
  ) {}

  ngOnInit(): void {
    //  this.editUser =this.user;
    console.log('ngInit edit: ', this.user);
    // this.editUser = this.userService.getSingleUser(this.userId);
    // this.user = this.tempUser = this.userService.getSingleUser();
  }

  saveUser() {
    this.userService.updateSingleUser(this.user);
    console.log('saveUser: ', this.user);
    this.dialogRef.close();
  }
}
