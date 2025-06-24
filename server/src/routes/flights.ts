import express from 'express';
import { FlightService } from '../services/flightService';
import { FlightSearchParams } from '../types/flight';

const router = express.Router();
const flightService = new FlightService();

// Search for flights
router.get('/search', async (req, res) => {
  try {
    const flightService = new FlightService();
    
    // Extract search parameters from query
    const searchParams: any = { ...req.query };
    
    // Add deep_search parameter if not specified (gives better results)
    if (searchParams.deep_search === undefined) {
      searchParams.deep_search = true;
    }
    
    // Convert numeric parameters that might come as strings
    if (searchParams.adults && typeof searchParams.adults === 'string') {
      searchParams.adults = parseInt(searchParams.adults);
    }
    
    if (searchParams.children && typeof searchParams.children === 'string') {
      searchParams.children = parseInt(searchParams.children);
    }
    
    if (searchParams.type && typeof searchParams.type === 'string') {
      searchParams.type = parseInt(searchParams.type);
    }
    
    if (searchParams.travel_class && typeof searchParams.travel_class === 'string') {
      searchParams.travel_class = parseInt(searchParams.travel_class);
    }
    
    
    const result = await flightService.searchFlights(searchParams);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to search flights' 
    });
  }
});

// Get flight prices for calendar view
router.get('/prices', async (req, res) => {
  try {
    const params = req.query as unknown as FlightSearchParams;
    const result = await flightService.getFlightPrices(params);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Something went wrong' 
    });
  }
});

// Track flight prices
router.post('/track', async (req, res) => {
  try {
    const params = req.body as FlightSearchParams;
    const result = await flightService.trackFlightPrices(params);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Something went wrong' 
    });
  }
});

export default router;
