import { BookingModel } from 'src/app/manage-bookings/models/booking-types';

export function getBookingCost(booking: BookingModel): number {
  return booking.flights
    .map(flight => flight.price)
    .reduce((total, price) => {
      return total + price * booking.travelers.length;
    }, 0);
}
