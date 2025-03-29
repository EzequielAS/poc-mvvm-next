import { useForm } from "react-hook-form";
import { FlightFormData, flightFormSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlightFormModelArgs, FlightFormModelPaths } from "./types";
import { FlightFormModel } from "./class-model";
import { useState } from "react";
import { FlightFormModelParams } from "./types";

export function useFlightFormModel({ airports, loading }: FlightFormModelParams) {
  const form = useForm<FlightFormData>({
    resolver: zodResolver(flightFormSchema),
    defaultValues: {
      passengers: 1,
    },
  });

  const [hasSecondPath, setHasSecondPath] = useState(false);

  const isShowingAddPathButton = 
    form.watch("firstOrigin") 
    && form.watch("firstDestination")
    && !hasSecondPath;

  const onSubmit = (data: FlightFormData) => {
    console.log(data);
  };

  function switchStations(type: FlightFormModelPaths) {
    const originName = type === 'firstPath' 
      ? 'firstOrigin' : 'secondOrigin'
    const destinationName = type === 'firstPath' 
      ? 'firstDestination' : 'secondDestination'

    const stations: FlightFormModelArgs = {
      [originName]: form.getValues(originName),
      [destinationName]: form.getValues(destinationName),
    }

    const flightFormModel = new FlightFormModel(stations);

    flightFormModel.switchStations(type)

    form.setValue(originName, flightFormModel[originName]);
    form.setValue(destinationName, flightFormModel[destinationName]);
  }

  function addNewPath() {
    const flightFormModel = new FlightFormModel(
      {
        firstOrigin: form.getValues("firstOrigin"),
        firstDestination: form.getValues("firstDestination"),
      }
    );

    flightFormModel.addNewPath()

    form.setValue("secondOrigin", flightFormModel.secondOrigin);
    setHasSecondPath(true);
  }

  function removePath() {
    const flightFormModel = new FlightFormModel({
      secondOrigin: form.getValues("secondOrigin"),
      secondDestination: form.getValues("secondDestination"),
    });

    flightFormModel.removePath()    

    form.setValue("secondOrigin", flightFormModel.secondOrigin);
    form.setValue("secondDestination", flightFormModel.secondDestination);
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
