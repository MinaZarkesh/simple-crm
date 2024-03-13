import { Component } from '@angular/core';
import { Witness } from '../../../../models/witness.class';



@Component({
  selector: 'app-dialog-edit-witness',
  standalone: true,
  imports: [],
  templateUrl: './dialog-edit-witness.component.html',
  styleUrl: './dialog-edit-witness.component.scss'
})
export class DialogEditWitnessComponent {
witness!: Witness;
witnessId!: string;
}
