import { Component, OnInit } from '@angular/core';

import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// import { User } from '../../models/user.class';
// import { UserListService } from '../firebase-services/firebase.service';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
// import { DialogAddUserComponent } from './dialogs/dialog-add-user/dialog-add-user.component';

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
    MatMenuModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})

export class UserComponent implements OnInit {
  // // noteList: User[] = [];
  // user: User | any = new User();
  // defaultUsers: User[] = [
  //   {
  //     docId: '1',
  //     name: 'John Doe',
  //     address: 'Musterstraße 1, 30657 Hannover',
  //     phone: '01234567890',
  //     role: 'Opfer',
  //     statements: [
  //       'statement_id1',
  //       'statement_id2',
  //       'statement_id3',
  //       'statement_id4',
  //     ],
  //   },
  //   {
  //     docId: '2',
  //     name: 'Jane Doe',
  //     address: 'Musterstraße 2, 30657 Hannover',
  //     phone: '01234567891',
  //     role: 'Beobachter',
  //     statements: [
  //       'statement_id5',
  //       'statement_id6',
  //       'statement_id7',
  //       'statement_id8',
  //     ],
  //   },
  //   {
  //     docId: '3',
  //     name: 'John Smith',
  //     address: 'Musterstraße 10, 30657 Hannover',
  //     phone: '01234567899',
  //     role: 'Angeklagter',
  //     statements: [
  //       'statement_id37',
  //       'statement_id38',
  //       'statement_id39',
  //       'statement_id40',
  //     ],
  //   },
  // ];

  // panelOpenState = false;

  // constructor(public dialog: MatDialog, private userService: UserListService) {}
  //
  
  async ngOnInit() {}

  getList() {
    // return this.userService.normalUsers;
  }

  openDialog() {
    // this.dialog.open(DialogAddUserComponent);
  }
}
