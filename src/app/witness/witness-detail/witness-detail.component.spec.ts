import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessDetailComponent } from './witness-detail.component';

describe('WitnessDetailComponent', () => {
  let component: WitnessDetailComponent;
  let fixture: ComponentFixture<WitnessDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WitnessDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WitnessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
