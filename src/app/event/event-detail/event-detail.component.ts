import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';

import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.class';
import { UserListService } from '../../firebase-services/user-list.service';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DialogEditEventComponent } from '../dialogs/dialog-edit-event/dialog-edit-event.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTab,
    MatIcon,
    MatTabGroup,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  userId!: string;
  currentUser: User | any = new User();
  tempUser!: User | any;
  loading: boolean = false;

  panelOpenState = false;
  constructor(
    private route: ActivatedRoute,
    public userService: UserListService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userService.subSingleUser(this.userId);
  }

  defaultUser(): User {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      return {
        docId: '1',
        name: 'John Doe',
        email: 'dfL0K@example.com',
        capacity: true,
        trails: [],
      };
    }
  }

  getUserId(id: string): string {
    if (id) {
      return id;
    } else {
      console.log('getUserId: ', id);
      return 'Ermittler000';
    }
  }

  editUserDetail() {
    // const dialog = this.dialog.open(DialogEditEventComponent);
    // // //user -> Variable aus DialogUserComponent
    // // // NICHT .user = this.currentUser, denn das bearbeitet auch den aktuellen User
    // // // new User(this.currentUser) erstellt ein neues User-Objekt, eine Kopie des aktuellen
    // console.log(this.currentUser);
    // dialog.componentInstance.user = new User(this.userService.currentUser);

    // dialog.componentInstance.userId = this.userId;
    // //  dialog.componentInstance.trails = this.trails;
  }

  openDeleteDialog() {
    // const dialog = this.dialog.open(DialogDeleteUserComponent);
    // dialog.componentInstance.user = new User(this.userService.currentUser);

    // dialog.componentInstance.userId = this.userId;
  }

  async deleteUser() {
    console.log('deleteUser: ', this.userId);
    this.loading = true;
    await this.userService.deleteSingleUser(this.userId);
    this.loading = false;
    window.location.href = '/user';
  }
}
