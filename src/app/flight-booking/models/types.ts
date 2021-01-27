export enum AirportType {
  ORIGIN = 'Origin',
  DESTINATION = 'Destination'
}

export interface Airport {
  iataIdent: string;
  city: string;
  name: string;
}

export enum TripType {
  ROUND_TRIP = 'Round Trip',
  ONE_WAY = 'One Way'
}
