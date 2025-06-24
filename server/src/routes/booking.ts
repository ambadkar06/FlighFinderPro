import express, { Request, Response } from 'express';
import { BookingService } from '../services/bookingService';

const router = express.Router();
const bookingService = new BookingService();

// GET /api/booking/options?booking_token=...
router.get('/options', async (req: Request, res: Response) => {
 
  try {
    const { booking_token, departure_id, arrival_id, outbound_date } = req.query;

    if (
      !booking_token || typeof booking_token !== 'string' ||
      !departure_id || typeof departure_id !== 'string' ||
      !arrival_id || typeof arrival_id !== 'string' ||
      !outbound_date || typeof outbound_date !== 'string'
    ) {
      return res.status(400).json({ success: false, error: 'Missing required booking parameters.' });
    }

    const options = await bookingService.getBookingOptions(
      booking_token,
      departure_id,
      arrival_id,
      outbound_date
    );
    res.json({ success: true, options });
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch booking options from provider.';
    res.status(500).json({ success: false, error: errorMessage });
  }
});

export default router;
