import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditStatementComponent } from './dialog-edit-statement.component';

describe('DialogEditStatementComponent', () => {
  let component: DialogEditStatementComponent;
  let fixture: ComponentFixture<DialogEditStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
