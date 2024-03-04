import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserListService } from '../firebase-services/user-list.service';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatIconButton, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: string | null = this.UserListService.userId;
  @Input() currentUser!: User;

  tempUser: User | undefined;
  constructor(
    private route: ActivatedRoute,
    private UserListService: UserListService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('ngInit: ', this.userId);

    this.currentUser = this.getUser(this.getUserId(this.userId!));
  }

  getUser(id: string): User {
    // use this.currentUser
    this.tempUser = this.UserListService.normalUsers.find(
      (currentUser) => currentUser.docId === id
    );

    if (this.tempUser) {
      this.currentUser = this.tempUser;
      console.log(this.tempUser);
    } else {
      this.currentUser = this.defaultUser();
      console.log('no user found with id: ', this.userId);
    }
    return this.currentUser;
  }

  defaultUser(): User {
    return {
      docId: this.userId!,
      name: 'John Doe',
      email: 'doe@polizei.de',
      capacity: false,
      trails: [],
    };
  }

  getUserId(id: string): string {
    if (id) {
      return id;
    } else {
      return 'Ermittler000';
    }
  }
  // editUserDetail() {
  //   const dialog = this.dialog.open(DialogEditUserComponent);
  //   //user -> Variable aus DialogUserComponent
  //   // NICHT .user = this.currentUser, denn das bearbeitet auch den aktuellen User
  //   // new User(this.currentUser) erstellt ein neues User-Objekt, eine Kopie des aktuellen
  //   dialog.componentInstance.user = new User(this.currentUser);
  //   dialog.componentInstance.userId = this.userId;
  // }
}
