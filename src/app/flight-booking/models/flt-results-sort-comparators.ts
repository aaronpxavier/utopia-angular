import {Flight} from './flight';


export function durationComparator(a: Flight, b: Flight): number {
  if (a.calculateTimeBetween() < b.calculateTimeBetween()) {
    return -1;
  }
  if (a.calculateTimeBetween() > b.calculateTimeBetween()) {
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

