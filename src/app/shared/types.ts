export interface FlightDetailsModel {
  flightNumber: string,
  departCityId: string,
  arriveCityId: string
}

export interface FlightModel {
  flightId: number,
  departTime: Date,
  arrivalTime: Date,
  seatsAvailable: number,
  price: number,
  flightNumber: string,
  flightDetails: FlightDetailsModel
}

export interface FlightMultihopModel {
  leg1: FlightModel,
  leg2: FlightModel
}