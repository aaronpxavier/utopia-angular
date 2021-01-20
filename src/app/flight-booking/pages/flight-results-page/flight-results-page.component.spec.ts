import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightResultsPageComponent } from './flight-results-page.component';

describe('FlightResultsPageComponent', () => {
  let component: FlightResultsPageComponent;
  let fixture: ComponentFixture<FlightResultsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightResultsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightResultsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
