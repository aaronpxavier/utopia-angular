
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

  public getPrice(): number {
    return this.getNumLegs() > 1 ? this.getLegs()[0].price + this.getLegs()[1].price : this.getLegs()[0].price;
  }

  public calculateTimeBetween(): string {
    const legs = this.getLegs();
    const departureTime = legs[0].departTime;
    if (legs[0].flightNumber === '1451') {
      console.log('1451');
    }
    const arrivalTime = legs.length === 2 ? legs[1].arrivalTime : legs.length === 1 ? legs[0].arrivalTime : undefined;
    if (arrivalTime === undefined) {
      throw Error('Arrival time undefined');
    }
    // const hoursMins = (arrivalTime.getMilliseconds() - departureTime.getMilliseconds() / 3600) % 24);
    const seconds = (arrivalTime.getTime() - departureTime.getTime());
    const hours = Math.floor(seconds / 3600000);
    const min = Math.floor(seconds / 3600000 % 1 * 60);
    return hours + 'h ' +  (min ? min + 'm' : '');
  }
}

