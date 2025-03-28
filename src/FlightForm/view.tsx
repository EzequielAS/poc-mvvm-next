import { useFlightFormModel } from "./model";

export function FlightFormView({ 
  form, 
  onSubmit, 
  airports 
}: ReturnType<typeof useFlightFormModel>) {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Flight Search</h2>
    
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4"
        data-testid="form-search-submit-form"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
            <select
              {...form.register("origin")}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                form.formState.errors.origin ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select origin</option>
              {airports.map((airport) => (
                <option key={airport.value} value={airport.value}>
                  {airport.label}
                </option>
              ))}
            </select>
            {form.formState.errors.origin && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.origin.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <select
              {...form.register("destination")}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                form.formState.errors.destination ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select destination</option>
              {airports.map((airport) => (
                <option key={airport.value} value={airport.value}>
                  {airport.label}
                </option>
              ))}
            </select>
            {form.formState.errors.destination && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.destination.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
            <input
              type="date"
              {...form.register("departureDate")}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                form.formState.errors.departureDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {form.formState.errors.departureDate && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.departureDate.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
            <input
              type="date"
              {...form.register("returnDate")}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                form.formState.errors.returnDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {form.formState.errors.returnDate && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.returnDate.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
          <input
            type="number"
            {...form.register("passengers", { valueAsNumber: true })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              form.formState.errors.passengers ? "border-red-500" : "border-gray-300"
            }`}
          />
          {form.formState.errors.passengers && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.passengers.message}</p>
          )}
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search Flights
          </button>
        </div>
      </form>
  </div>
  )
}
