import type { Airport } from "@/services/get-flights";
import type { FlightFormData } from "./validation";

export type FlightFormModelPaths = "firstPath" | "secondPath";

export type FlightFormModelParams = {
	airports: Airport[];
	loading: boolean;
};

export type ChangeValueParams = (
	currentValues: FlightFormData,
) => FlightFormData;
