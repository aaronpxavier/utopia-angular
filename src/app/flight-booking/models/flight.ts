import { FlightModel } from 'src/app/shared/models/types';

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

}

