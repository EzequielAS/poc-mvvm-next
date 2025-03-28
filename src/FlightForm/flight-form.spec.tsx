import { it, expect, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useFlightFormModel } from './model';
import { FlightFormView } from './view';
import { flightFormSchema } from './validation';

function Sut() {
  // here goes the mock api call
  const flightFormData = useFlightFormModel();
  return <FlightFormView {...flightFormData} />;
}

describe('Flight Form', () => {
  it('should validate if form is firing validation errors', async () => {
    const { findByTestId, findByText } = render(<Sut />);

    const form = await findByTestId('form-search-submit-form');

    fireEvent.submit(form);

    const originErrorMessage = await findByText('Origin is required');
    const destinationErrorMessage = await findByText('Destination is required');
    const departureDateErrorMessage = await findByText('Departure date is required');
    const returnDateErrorMessage = await findByText('Return date is required');
    
    expect(originErrorMessage).toBeInTheDocument();
    expect(destinationErrorMessage).toBeInTheDocument();
    expect(departureDateErrorMessage).toBeInTheDocument();
    expect(returnDateErrorMessage).toBeInTheDocument();
  });

  it('should validate if schema validation is correct', () => {
    const { error } = flightFormSchema.safeParse({ 
      origin: 'london',
      destination: 'london',
      departureDate: '2024-01-01',
      returnDate: '2024-01-01',
      passengers: 1
    })

    const errors = error?.errors

    expect(errors?.[0].message).toEqual('Origin and destination cannot be the same');
    expect(errors?.[1].message).toEqual('Origin and destination cannot be the same');
  });
}); 