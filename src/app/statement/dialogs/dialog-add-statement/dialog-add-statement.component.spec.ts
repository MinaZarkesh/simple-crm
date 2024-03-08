import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddStatementComponent } from './dialog-add-statement.component';

describe('DialogAddStatementComponent', () => {
  let component: DialogAddStatementComponent;
  let fixture: ComponentFixture<DialogAddStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
