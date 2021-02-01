export interface AirportModel {
  iataIdent: string;
  city: string;
  name: string;
}

export interface FlightDetailsModel {
  flightNumber: string;
  departCityId: string;
  arriveCityId: string;
}

export interface FlightModel {
  flightId: number;
  departTime: Date;
  arrivalTime: Date;
  seatsAvailable: number;
  price: number;
  flightNumber: string;
  flightDetails: FlightDetailsModel;
}

export interface FlightMultihopModel {
  leg1: FlightModel;
  leg2: FlightModel;
}

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
