import { useState, useCallback } from 'react';
import { bookingService } from '../services/bookingService';
import toast from 'react-hot-toast';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = async (bookingData) => {
    const data = await bookingService.createBooking(bookingData);
    toast.success('Session booked successfully!');
    await fetchBookings();
    return data;
  };

  const cancelBooking = async (id) => {
    try {
      await bookingService.cancelBooking(id);
      toast.success('Booking cancelled');
      await fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
      throw err;
    }
  };

  return { bookings, loading, fetchBookings, createBooking, cancelBooking };
};
