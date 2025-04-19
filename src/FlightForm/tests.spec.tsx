import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FlightFormController } from "./controller";
import { useFlightFormModel } from "./model";
import { flightFormSchema } from "./validation";
import { FlightFormView } from "./view";

function Sut() {
	const mockAirports = [
		{ value: "london", label: "London" },
		{ value: "dubai", label: "Dubai" },
	];

	const flightFormData = useFlightFormModel({
		airports: mockAirports,
		loading: false,
	});

	return <FlightFormView {...flightFormData} />;
}

describe("Flight Form", () => {
	it("should validate if form is firing validation errors", async () => {
		const { findByTestId, findByText } = render(<Sut />);

		const form = await findByTestId("form-search-submit-form");

		fireEvent.submit(form);

		const originErrorMessage = await findByText("Origin is required");
		const destinationErrorMessage = await findByText("Destination is required");
		const departureDateErrorMessage = await findByText(
			"Departure date is required",
		);
		const returnDateErrorMessage = await findByText("Return date is required");

		expect(originErrorMessage).toBeInTheDocument();
		expect(destinationErrorMessage).toBeInTheDocument();
		expect(departureDateErrorMessage).toBeInTheDocument();
		expect(returnDateErrorMessage).toBeInTheDocument();
	});

	it("should validate controller", async () => {
		const flightFormController = new FlightFormController();

		const values = flightFormController.addNewPath({
			firstOrigin: "london",
			firstDestination: "dubai",
			departureDate: "12-12-2025",
			returnDate: "13-12-2025",
			passengers: 1,
		});

		expect(values.secondOrigin).toEqual("dubai");
		expect(values.secondDestination).toSatisfy(
			(value) => value === null || value === undefined,
		);
	});

	it("should validate if schema validation is correct", () => {
		const { error } = flightFormSchema.safeParse({
			firstOrigin: "london",
			firstDestination: "london",
			departureDate: "2024-01-01",
			returnDate: "2024-01-01",
			passengers: 1,
		});

		const errors = error?.errors;

		expect(errors?.[0].message).toEqual(
			"Origin and destination cannot be the same",
		);
		expect(errors?.[1].message).toEqual(
			"Origin and destination cannot be the same",
		);
	});
});
