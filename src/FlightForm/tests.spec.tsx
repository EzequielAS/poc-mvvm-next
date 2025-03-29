import { it, expect, describe } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useFlightFormModel } from './model';
import { FlightFormView } from './view';
import { flightFormSchema } from './validation';
import { FlightFormModel } from './model/class-model';

function Sut() {
  const mockAirports = [
    { value: 'london', label: 'London' }, { value: 'dubai', label: 'Dubai' }
  ];

  const flightFormData = useFlightFormModel({ 
    airports: mockAirports, 
    loading: false 
  });
  
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

  it('should validate class model', async () => {
    const flightFormModel = new FlightFormModel({
      firstOrigin: 'london',
      firstDestination: 'dubai',
    });

    flightFormModel.addNewPath();

    expect(flightFormModel.secondOrigin).toEqual('dubai');
    expect(flightFormModel.secondDestination).toEqual('');
  });

  it('should validate if schema validation is correct', () => {
    const { error } = flightFormSchema.safeParse({ 
      firstOrigin: 'london',
      firstDestination: 'london',
      departureDate: '2024-01-01',
      returnDate: '2024-01-01',
      passengers: 1,
    })

    const errors = error?.errors

    expect(errors?.[0].message).toEqual('Origin and destination cannot be the same');
    expect(errors?.[1].message).toEqual('Origin and destination cannot be the same');
  });
}); 