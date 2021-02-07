import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightResultsOptionsComponent } from './flight-results-options.component';

describe('FlightResultsOptionsComponent', () => {
  let component: FlightResultsOptionsComponent;
  let fixture: ComponentFixture<FlightResultsOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightResultsOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightResultsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
