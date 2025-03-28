'use client'
import { useFlightFormModel } from './model';
import { FlightFormView } from './view';

export function FlightForm() {
  const flightFormData = useFlightFormModel();

  return <FlightFormView {...flightFormData} />;
}
