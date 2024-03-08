import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteWitnessComponent } from './dialog-delete-witness.component';

describe('DialogDeleteWitnessComponent', () => {
  let component: DialogDeleteWitnessComponent;
  let fixture: ComponentFixture<DialogDeleteWitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteWitnessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeleteWitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
