import {Flight} from './flight';


export function durationComparator(a: Flight, b: Flight): number {
  const legsA = a.getLegs();
  const legsB = b.getLegs();
  const departureTimeA = legsA[0].departTime;
  const arrivalTimeA = legsA.length === 2 ? legsA[1].arrivalTime : legsA.length === 1 ? legsA[0].arrivalTime : undefined;
  const departureTimeB = legsB[0].departTime;
  const arrivalTimeB = legsB.length === 2 ? legsB[1].arrivalTime : legsB.length === 1 ? legsB[0].arrivalTime : undefined;
  const aDiff = arrivalTimeA.getTime() - departureTimeA.getTime();
  const bDiff = arrivalTimeB.getTime() - departureTimeB.getTime();
  if (aDiff < bDiff) {
    return -1;
  }
  if (aDiff > bDiff) {
    return 1;
  }
  return 0;
}

export function priceComparator(a: Flight, b: Flight): number {
  if (a.getPrice() < b.getPrice()) {
    return -1;
  }
  if (a.getPrice() > b.getPrice()) {
    return 1;
  }
  return 0;
}

export function stopsComparator(a: Flight, b: Flight): number {
  if (a.getNumLegs() - 1 < b.getNumLegs() - 1) {
    return -1;
  }
  if (a.getNumLegs() - 1 > b.getNumLegs() - 1) {
    return 1;
  }
  return 0;
}

