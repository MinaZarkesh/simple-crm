import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.interface';
import { UserListService } from '../firebase-services/user-list.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    NgFor,
    RouterLink,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  // noteList: User[] = [];
  user: User | any = new User();
  defaultUsers: User[] = [
    {
      docId: 'Ermittler001',
      name: 'Leeroy Jethro Gibbs',
      email: 'ermittlerA@polizei.de',
      capacity: true,
      trails: ['Spur 1', 'Spur 2', 'Spur 3'],
    },
    {
      docId: 'Ermittler002',
      name: 'Timothy McGee',
      email: 'ermittlerB@polizei.de',
      capacity: true,
      trails: ['Spur 1', 'Spur 2'],
    },
    {
      docId: 'Ermittler003',
      name: 'Abby Scuito',
      email: 'ermittlerC@polizei.de',
      capacity: false,
      trails: ['Spur 3'],
    },
  ];
 

  constructor(public dialog: MatDialog, private userService: UserListService) {}
  async ngOnInit() {}

  getList() {
    return this.userService.normalUsers;
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
