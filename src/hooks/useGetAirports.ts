import { useState, useEffect } from 'react';
import { Airport, getFlights } from '../services/get-flights';

export function useGetAirports() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getFlights();
        setAirports(data);
      } catch (error) {
        console.error('Error fetching airports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  return { airports, loading };
}
