import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';

import { User } from '../../models/user.class';
import { UserListService } from '../firebase-services/user-list.service';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialogs/dialog-add-user/dialog-add-user.component';


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
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatMenuModule
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
 
   panelOpenState = false;

  constructor(public dialog: MatDialog, private userService: UserListService) {}
  async ngOnInit() {}

  getList() {
    return this.userService.normalUsers;
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
