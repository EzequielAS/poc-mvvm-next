import type { FlightFormModelPaths } from "./types";
import type { FlightFormData } from "./validation";

export class FlightFormController {
	public addNewPath(data: FlightFormData): FlightFormData {
		return {
			...data,
			secondOrigin: data.firstDestination,
		};
	}

	public removePath(data: FlightFormData): FlightFormData {
		return {
			...data,
			secondOrigin: "",
			secondDestination: "",
		};
	}

	public switchStations(
		data: FlightFormData,
		type: FlightFormModelPaths,
	): FlightFormData {
		if (type === "firstPath") {
			const tempOrigin = data.firstOrigin;
			const tempDestination = data.firstDestination;

			return {
				...data,
				firstOrigin: tempDestination,
				firstDestination: tempOrigin,
			};
		}

		const tempOrigin = data.secondOrigin;
		const tempDestination = data.secondDestination;

		return {
			...data,
			secondOrigin: tempDestination,
			secondDestination: tempOrigin,
		};
	}
}
