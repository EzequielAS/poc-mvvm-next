import { FlightFormModelArgs, FlightFormModelPaths } from "./types";

export class FlightFormModel {
  public firstOrigin: string;
  public firstDestination: string;
  public secondOrigin: string;
  public secondDestination: string;

  constructor(args: FlightFormModelArgs) {
    this.firstOrigin = args.firstOrigin || '';
    this.firstDestination = args.firstDestination || '';
    this.secondOrigin = args.secondOrigin || '';
    this.secondDestination = args.secondDestination || '';
  }

  public addNewPath() {
    this.secondOrigin = this.firstDestination;
  }

  public removePath() {
    this.secondOrigin = '';
    this.secondDestination = '';
  }

  public switchStations(type: FlightFormModelPaths) {
    if (type === 'firstPath') {
      const tempOrigin = this.firstOrigin;
      const tempDestination = this.firstDestination;

      this.firstOrigin = tempDestination;
      this.firstDestination = tempOrigin;
      return;
    }

    const tempOrigin = this.secondOrigin;
    const tempDestination = this.secondDestination;

    this.secondOrigin = tempDestination;
    this.secondDestination = tempOrigin;
  }
}