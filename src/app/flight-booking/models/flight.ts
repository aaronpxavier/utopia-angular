
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

export class Flight {
  legs: FlightModel[];

  constructor() {
    this.legs  = new Array<FlightModel>();
  }

  public addLeg(flightModel: FlightModel): void {
    this.legs.push(flightModel);
  }

  public getLegs(): FlightModel[] {
    return this.legs;
  }

  public getNumLegs(): number {
    return this.legs.length;
  }
}
