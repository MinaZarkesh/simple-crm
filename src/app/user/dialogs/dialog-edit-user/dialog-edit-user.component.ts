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
import { User } from '../../../../models/user.interface';
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
