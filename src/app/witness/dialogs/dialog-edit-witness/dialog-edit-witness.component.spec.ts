import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditWitnessComponent } from './dialog-edit-witness.component';

describe('DialogEditWitnessComponent', () => {
  let component: DialogEditWitnessComponent;
  let fixture: ComponentFixture<DialogEditWitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditWitnessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditWitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
