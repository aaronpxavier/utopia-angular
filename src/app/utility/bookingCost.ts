import { BookingModel } from '../shared/models/types';

export function getBookingCost(booking: BookingModel): number {
  return booking.flights
    .map(flight => flight.price)
    .reduce((total, price) => {
      return total + price * booking.travelers.length;
    }, 0);
}
