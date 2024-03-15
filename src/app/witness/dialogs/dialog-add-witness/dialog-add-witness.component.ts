import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Witness } from '../../../../models/witness.class';
import { firebaseService } from '../../../firebase-services/firebase.service';
import { NgIf, NgFor, NgForOf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogContent } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog-add-witness',
  standalone: true,
  imports: [
    MatDialogActions,
    MatOption,
    NgFor,
    NgForOf,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    NgIf,
    MatSelectModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-witness.component.html',
  styleUrl: './dialog-add-witness.component.scss',
})
export class DialogAddWitnessComponent implements OnInit {
  witnessId: string | null = '';
  witness = new Witness();
  witnesses: any = [];
  loading: boolean = false;
  htmlStatements: any = new FormControl('');
  roles = this.fireService.roles;
  selected = 'Rolle im Fall';

  dummyWitnessses: any[] = [
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
      description:
        'Der verdächtige Mann hatte einen Unfall, während er zu fliehen versuchte.',
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
      description:
        'Ein verdächtiger Mann wurde in der Nähe des Tatorts gesehen.',
      users: ['Zeuge_id4', 'Zeuge_id5', 'Zeuge_id6'],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    // public userService: UserListService,
    public fireService: firebaseService,
    public dialogRef: MatDialogRef<DialogAddWitnessComponent>
  ) {}

  ngOnInit(): void {
    this.witnessId = this.route.snapshot.paramMap.get('id');
    this.getList();
  }

  getList() {
    return this.fireService.witnesses;
  }

  async addWitness() {
    this.loading = true;
    this.witness.role = this.selected;
    this.witness.statements = [];
    
    let tempWitness: Witness = {
      docId: 'test',
      name: this.witness.name,
      address: this.witness.address,
      phone: this.witness.phone,
      role: this.witness.role,
      statements: this.witness.statements,
    };
    
    // console.log("addWitness: getList: ",this.witnesses, tempWitness);
    await this.fireService.addWitness(tempWitness);
    console.log("addWitness: test", tempWitness, this.fireService.witnesses);
    // debugger;
    this.witnesses = this.getList();
    // this.fireService.witnesses.push(tempWitness);
    // let test: any = this.getList();
    this.loading = false;
    this.dialogRef.close();
  }
}
