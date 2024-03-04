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
  user: User = {
    docId: '',
    name: '',
    email: '',
    capacity: true,
    trails: ['Spur 1', 'Spur 2', 'Spur 3', 'Spur 4', 'Spur 5', 'Spur 6'],
  };

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
    this.user.trails = this.trails.value;
    // this.currentUser.capacity = this.capacity;
    let user: User = {
      docId: '',
      name: this.user.name,
      email: this.user.email,
      capacity: this.user.capacity,
      trails: this.user.trails,
    };

    console.log(this.user);

    await this.userService.addUser(user);
    user =
      this.userService.normalUsers[this.userService.normalUsers.length - 1];
    if(user.docId)await this.userService.updateSingleUser(user.docId, user);
    // this.getList();
    this.loading = false;

    // let test: any = this.getList();

    this.dialogRef.close();
  }
}
