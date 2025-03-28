import { useForm } from "react-hook-form";
import { FlightFormData, flightFormSchema, airports } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";

export function useFlightFormModel() {
  const form = useForm<FlightFormData>({
    resolver: zodResolver(flightFormSchema),
    defaultValues: {
      passengers: 1,
    },
  });

  const onSubmit = (data: FlightFormData) => {
    console.log(data);
  };

  return { form, onSubmit, airports  };
}
