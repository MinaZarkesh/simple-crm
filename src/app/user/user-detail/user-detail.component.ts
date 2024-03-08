import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.class';
import { UserListService } from '../../firebase-services/user-list.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialogs/dialog-edit-user/dialog-edit-user.component';
import { DialogDeleteUserComponent } from '../dialogs/dialog-delete-user/dialog-delete-user.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { ThemePalette } from '@angular/material/core';
import {
  ProgressBarMode,
  MatProgressBarModule,
} from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    MatExpansionModule,
    MatInputModule,
    MatProgressBarModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    NgIf,
    FormsModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId!: string;
  currentUser: User | any = new User();
  tempUser!: User | any;
  loading: boolean = false;
  panelOpenState = false;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 66;
  bufferValue = 75;

  checked = true;

  disabled = false;

  dummyUsers: User[] = [
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
      description:'Der verdächtige Mann hatte einen Unfall, während er zu fliehen versuchte.',
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
      description:'Ein verdächtiger Mann wurde in der Nähe des Tatorts gesehen.',
      users: ['Zeuge_id4', 'Zeuge_id5', 'Zeuge_id6'],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    // public userService: UserListService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    // this.userService.subSingleUser(this.userId);
  }

  // defaultUser(): User {
  //   if (this.currentUser) {
  //     return this.currentUser;
  //   } else {
  //     return {
  //       docId: '1',
  //       name: 'John Smith',
  //       address: 'Musterstraße 10, 30657 Hannover',
  //       phone: '01234567899',
  //       role: 'Angeklagter',
  //       statements: [
  //         'statement_id37',
  //         'statement_id38',
  //         'statement_id39',
  //         'statement_id40',
  //       ],
  //     };
  //   }
  // }

  // getUserId(id: string): string {
  //   if (id) {
  //     return id;
  //   } else {
  //     console.log('getUserId: ', id);
  //     return 'Ermittler000';
  //   }
  // }

  // editUserDetail() {
  //   const dialog = this.dialog.open(DialogEditUserComponent);
  //   // //user -> Variable aus DialogUserComponent
  //   // // NICHT .user = this.currentUser, denn das bearbeitet auch den aktuellen User
  //   // // new User(this.currentUser) erstellt ein neues User-Objekt, eine Kopie des aktuellen
  //   console.log(this.currentUser);
  //   // dialog.componentInstance.user = new User(this.userService.currentUser);

  //   dialog.componentInstance.userId = this.userId;
  //   //  dialog.componentInstance.trails = this.trails;
  // }

  // openDeleteDialog() {
  //   const dialog = this.dialog.open(DialogDeleteUserComponent);
  //   // dialog.componentInstance.user = new User(this.userService.currentUser);

  //   dialog.componentInstance.userId = this.userId;
  // }

  // async deleteUser() {
  //   console.log('deleteUser: ', this.userId);
  //   this.loading = true;
  //   // await this.userService.deleteSingleUser(this.userId);
  //   this.loading = false;
  //   window.location.href = '/user';
  // }
}
