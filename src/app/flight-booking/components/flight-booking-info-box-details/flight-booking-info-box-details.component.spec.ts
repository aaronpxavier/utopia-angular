import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingInfoBoxDetailsComponent } from './flight-booking-info-box-details.component';

describe('FlightBookingInfoBoxDetailsComponent', () => {
  let component: FlightBookingInfoBoxDetailsComponent;
  let fixture: ComponentFixture<FlightBookingInfoBoxDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightBookingInfoBoxDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookingInfoBoxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
