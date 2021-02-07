import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingInfoBoxComponent } from './flight-booking-info-box.component';

describe('FlightBookingInfoBoxComponent', () => {
  let component: FlightBookingInfoBoxComponent;
  let fixture: ComponentFixture<FlightBookingInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightBookingInfoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBookingInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
