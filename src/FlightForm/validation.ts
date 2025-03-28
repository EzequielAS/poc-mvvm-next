import { z } from "zod";

export const flightFormSchema = z.object({
  origin: z.string().min(1, { message: 'Origin is required' }),
  destination: z.string().min(1, { message: 'Destination is required' }),
  departureDate: z.string().min(1, { message: 'Departure date is required' }),
  returnDate: z.string().min(1, { message: 'Return date is required' }),
  passengers: z.number().min(1, { message: 'At least 1 passenger is required' }).max(10, { message: 'Maximum 10 passengers allowed' }),
}).refine(
  (data) => data.origin !== data.destination,
  {
    message: "Origin and destination cannot be the same",
    path: ["origin"]
  }
).refine(
  (data) => data.origin !== data.destination,
  {
    message: "Origin and destination cannot be the same",
    path: ["destination"]
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

export const airports = [
  { value: "sao-paulo", label: "São Paulo - SP" },
  { value: "new-york", label: "New York - NY" },
  { value: "london", label: "London - UK" },
  { value: "tokyo", label: "Tokyo - JP" },
  { value: "paris", label: "Paris - FR" },
  { value: "dubai", label: "Dubai - UAE" },
];