import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FlightFormController } from "./controller";
import type {
	ChangeValueParams,
	FlightFormModelParams,
	FlightFormModelPaths,
} from "./types";
import { type FlightFormData, flightFormSchema } from "./validation";

export function useFlightFormModel({
	airports,
	loading,
}: FlightFormModelParams) {
	const form = useForm<FlightFormData>({
		resolver: zodResolver(flightFormSchema),
		defaultValues: {
			passengers: 1,
		},
	});

	const [hasSecondPath, setHasSecondPath] = useState(false);

	const controller = new FlightFormController();

	const isShowingAddPathButton =
		form.watch("firstOrigin") &&
		form.watch("firstDestination") &&
		!hasSecondPath;

	function changeFormValues(action: ChangeValueParams) {
		const currentValues = form.getValues();
		const newValues = action(currentValues);
		form.reset(newValues);
	}

	const onSubmit = (data: FlightFormData) => {
		console.log(data);
	};

	function switchStations(type: FlightFormModelPaths) {
		changeFormValues((values) => controller.switchStations(values, type));
	}

	function addNewPath() {
		changeFormValues(controller.addNewPath);
		setHasSecondPath(true);
	}

	function removePath() {
		changeFormValues(controller.removePath);
		setHasSecondPath(false);
	}

	return {
		form,
		onSubmit,
		airports,
		loading,
		switchStations,
		addNewPath,
		removePath,
		isShowingAddPathButton,
		hasSecondPath,
	};
}
