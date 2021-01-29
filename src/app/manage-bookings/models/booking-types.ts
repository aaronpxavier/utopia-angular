import { FlightModel } from '../../flight-booking/models/flight';

export interface TravelerRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  dob: Date;
}

export interface TravelerModel extends TravelerRequest {
  travelerId: number;
}

export interface BookingModel {
  bookingId: number;
  isActive: boolean;
  stripeId: string;
  bookerId: number;
  flights: FlightModel[];
  travelers: TravelerModel[];
}
