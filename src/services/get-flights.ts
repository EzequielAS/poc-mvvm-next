export interface Airport {
  value: string;
  label: string;
}


export async function getFlights(): Promise<Airport[]> {
  const airports = [
    { value: "sao-paulo", label: "São Paulo - SP" },
    { value: "new-york", label: "New York - NY" },
    { value: "london", label: "London - UK" },
    { value: "tokyo", label: "Tokyo - JP" },
    { value: "paris", label: "Paris - FR" },
    { value: "dubai", label: "Dubai - UAE" },
  ];

  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(airports);
    }, 700);
  });
}
