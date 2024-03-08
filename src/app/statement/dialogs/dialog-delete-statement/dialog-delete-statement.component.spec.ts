import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteStatementComponent } from './dialog-delete-statement.component';

describe('DialogDeleteStatementComponent', () => {
  let component: DialogDeleteStatementComponent;
  let fixture: ComponentFixture<DialogDeleteStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeleteStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
