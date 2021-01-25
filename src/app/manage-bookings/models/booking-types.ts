import { FlightModel } from '../../flight-booking/models/flight';

export interface TravelerModel {
  travelerId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  dob: Date;
}

export interface BookingModel {
  bookingId: number;
  isActive: boolean;
  stripeId: string;
  bookerId: number;
  flights: FlightModel[];
  travelers: TravelerModel[];
}
