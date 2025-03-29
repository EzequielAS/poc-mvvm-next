import { z } from "zod";

export const flightFormSchema = z.object({
  firstOrigin: z.string().min(1, { message: 'Origin is required' }),
  firstDestination: z.string().min(1, { message: 'Destination is required' }),
  secondOrigin: z.string().optional(),
  secondDestination: z.string().optional(),
  departureDate: z.string().min(1, { message: 'Departure date is required' }),
  returnDate: z.string().min(1, { message: 'Return date is required' }),
  passengers: z.number().min(1, { message: 'At least 1 passenger is required' }).max(10, { message: 'Maximum 10 passengers allowed' }),
}).refine(
  (data) => data.firstOrigin !== data.firstDestination,
  {
    message: "Origin and destination cannot be the same",
    path: ["firstOrigin"]
  }
).refine(
  (data) => data.firstOrigin !== data.firstDestination,
  {
    message: "Origin and destination cannot be the same",
    path: ["firstDestination"]
  }
).refine(
  (data) => {
    if (!data.secondOrigin && !data.secondDestination) return true;
    return data.secondOrigin !== data.secondDestination;
  },
  {
    message: "Second origin and destination cannot be the same",
    path: ["secondOrigin"]
  }
).refine(
  (data) => {
    if (!data.secondOrigin && !data.secondDestination) return true;
    return data.secondOrigin !== data.secondDestination;
  },
  {
    message: "Second origin and destination cannot be the same",
    path: ["secondDestination"]
  }
).refine(
  (data) => {
    if (!data.departureDate || !data.returnDate) return true;
    return new Date(data.departureDate) <= new Date(data.returnDate);
  },
  {
    message: "Return date must be after departure date",
    path: ["returnDate"]
  }
);

export type FlightFormData = z.infer<typeof flightFormSchema>;
