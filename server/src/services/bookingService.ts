import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://serpapi.com/search.json';

export class BookingService {
  private apiKey: string;

  constructor() {
    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey) {
      this.apiKey = 'missing-api-key';
    } else {
      this.apiKey = apiKey;
    }
  }

  /**
   * Fetch OTA/airline booking options for a flight using SerpAPI booking_token
   * @param bookingToken The booking_token from SerpAPI flight search
   * @returns List of booking options (OTA/airline, price, and direct booking URL)
   */
  async getBookingOptions(
    bookingToken: string,
    departureId: string,
    arrivalId: string,
    outboundDate: string
  ): Promise<any[]> {
    try {
      const params = {
        engine: 'google_flights',
        api_key: this.apiKey,
        booking_token: bookingToken,
        departure_id: departureId,
        arrival_id: arrivalId,
        outbound_date: outboundDate,
        type: '2', // Explicitly set to One-way
      };
      const response = await axios.get(BASE_URL, { params });
      const bookingOptions = response.data.booking_options || [];
      return bookingOptions.map((optionGroup: any) => {
        const providerData = optionGroup.together;

        return {
          name: providerData?.book_with,
          price: providerData?.price,
          bookingRequest: providerData?.booking_request, // Pass the whole object
        };
      });
    } catch (error: any) {
      throw error;
    }
  }
}
