import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddWitnessComponent } from './dialog-add-witness.component';

describe('DialogAddWitnessComponent', () => {
  let component: DialogAddWitnessComponent;
  let fixture: ComponentFixture<DialogAddWitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddWitnessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddWitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
