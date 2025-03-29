import { Airport } from "@/services/get-flights"

export type FlightFormModelArgs = {
  firstOrigin?: string
  firstDestination?: string
  secondOrigin?: string
  secondDestination?: string
}

export type FlightFormModelPaths = 'firstPath' | 'secondPath'

export type FlightFormModelParams = {
  airports: Airport[];
  loading: boolean;
}