'use client'
import { useFlightFormModel } from './model';
import { FlightFormView } from './view';
import { useGetAirports } from '../hooks/useGetAirports';

export function FlightForm() {
  const { airports, loading } = useGetAirports();
  const flightFormData = useFlightFormModel({ airports, loading });

  return <FlightFormView {...flightFormData} />;
}
