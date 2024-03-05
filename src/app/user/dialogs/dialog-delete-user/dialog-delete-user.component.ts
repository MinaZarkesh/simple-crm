import { Component } from '@angular/core';
import { User } from '../../../../models/user.interface';
import { UserListService } from '../../../firebase-services/user-list.service';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import {  MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete-user',
  standalone: true,
  imports: [NgIf, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
  templateUrl: './dialog-delete-user.component.html',
  styleUrl: './dialog-delete-user.component.scss'
})
export class DialogDeleteUserComponent {
user!: User;
userId!: string;
index: number = -1;
loading: boolean = false;
users: User[] = [];

constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>, private userService: UserListService) { }

async deleteUser() {
  console.log('deleteUser: ', this.userId);
  this.loading = true;
  await this.userService.deleteSingleUser(this.userId);
  this.loading = false;
  window.location.href = '/user';
}
}
