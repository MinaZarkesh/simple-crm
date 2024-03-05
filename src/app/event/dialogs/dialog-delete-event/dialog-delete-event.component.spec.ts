import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteEventComponent } from './dialog-delete-event.component';

describe('DialogDeleteEventComponent', () => {
  let component: DialogDeleteEventComponent;
  let fixture: ComponentFixture<DialogDeleteEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeleteEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
