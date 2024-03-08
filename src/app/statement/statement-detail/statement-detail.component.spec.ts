import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDetailComponent } from './statement-detail.component';

describe('StatementDetailComponent', () => {
  let component: StatementDetailComponent;
  let fixture: ComponentFixture<StatementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
