import { ArrowsLeftRight } from "@phosphor-icons/react";
import { useFlightFormModel } from "./model"

export function FlightFormView({ 
  form, 
  onSubmit, 
  airports,
  switchStations,
  addNewPath,
  removePath,
  hasSecondPath,
  isShowingAddPathButton,
  loading
}: ReturnType<typeof useFlightFormModel>) {
  return (
    <div className={`max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md ${loading ? 'opacity-70' : ''}`}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Flight Search</h2>
    
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4"
        data-testid="form-search-submit-form"
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10 rounded-lg">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-blue-600 font-medium">Loading airports...</p>
            </div>
          </div>
        )}
        
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className={`block text-sm font-medium ${loading ? 'text-gray-500' : 'text-gray-700'} mb-1`}>Origin</label>
            <select
              {...form.register("firstOrigin")}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                form.formState.errors.firstOrigin ? "border-red-500" : "border-gray-300"
              } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              <option value="">Select origin</option>
              {airports.map((airport) => (
                <option key={airport.value} value={airport.value}>
                  {airport.label}
                </option>
              ))}
            </select>
            {form.formState.errors.firstOrigin && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.firstOrigin.message}</p>
            )}
          </div>

          <button 
            type="button"
            onClick={() => switchStations('firstPath')}
            className={`bg-gray-200 h-max p-2 mb-2 rounded-full hover:bg-gray-300 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            <ArrowsLeftRight size={16} />
          </button>
          
          <div className="flex-1">
            <label className={`block text-sm font-medium ${loading ? 'text-gray-500' : 'text-gray-700'} mb-1`}>Destination</label>
            <select
              {...form.register("firstDestination")}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                form.formState.errors.firstDestination ? "border-red-500" : "border-gray-300"
              } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              <option value="">Select destination</option>
              {airports.map((airport) => (
                <option key={airport.value} value={airport.value}>
                  {airport.label}
                </option>
              ))}
            </select>
            {form.formState.errors.firstDestination && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.firstDestination.message}</p>
            )}
          </div>
        </div>
        
        {isShowingAddPathButton && (
          <div className="flex justify-start">
            <button
              type="button"
              onClick={addNewPath}
              className={`bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300 focus:outline-none text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              Add another flight
            </button>
          </div>
        )}
        
        {hasSecondPath && (
          <>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className={`block text-sm font-medium ${loading ? 'text-gray-500' : 'text-gray-700'} mb-1`}>Second Origin</label>
                <select
                  {...form.register("secondOrigin")}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    form.formState.errors.secondOrigin ? "border-red-500" : "border-gray-300"
                  } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  <option value="">Select origin</option>
                  {airports.map((airport) => (
                    <option key={airport.value} value={airport.value}>
                      {airport.label}
                    </option>
                  ))}
                </select>
                {form.formState.errors.secondOrigin && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.secondOrigin.message}</p>
                )}
              </div>

              <button 
                type="button"
                onClick={() => switchStations('secondPath')}
                className={`bg-gray-200 h-max p-2 mb-2 rounded-full hover:bg-gray-300 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                <ArrowsLeftRight size={16} />
              </button>
              
              <div className="flex-1">
                <label className={`block text-sm font-medium ${loading ? 'text-gray-500' : 'text-gray-700'} mb-1`}>Second Destination</label>
                <select
                  {...form.register("secondDestination")}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    form.formState.errors.secondDestination ? "border-red-500" : "border-gray-300"
                  } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  <option value="">Select destination</option>
                  {airports.map((airport) => (
                    <option key={airport.value} value={airport.value}>
                      {airport.label}
                    </option>
                  ))}
                </select>
                {form.formState.errors.secondDestination && (
                  <p className="mt-1 text-sm text-red-600">{form.formState.errors.secondDestination.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={removePath}
                className={`bg-red-100 text-red-700 py-1 px-3 rounded-md hover:bg-red-200 focus:outline-none text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                Remove second flight
              </button>
            </div>
          </>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${loading ? 'text-gray-500' : 'text-gray-700'} mb-1`}>Departure Date</label>
            <input
              type="date"
              {...form.register("departureDate")}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                form.formState.errors.departureDate ? "border-red-500" : "border-gray-300"
              } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              disabled={loading}
            />
            {form.formState.errors.departureDate && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.departureDate.message}</p>
            )}
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${loading ? 'text-gray-500' : 'text-gray-700'} mb-1`}>Return Date</label>
            <input
              type="date"
              {...form.register("returnDate")}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                form.formState.errors.returnDate ? "border-red-500" : "border-gray-300"
              } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              disabled={loading}
            />
            {form.formState.errors.returnDate && (
              <p className="mt-1 text-sm text-red-600">{form.formState.errors.returnDate.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className={`block text-sm font-medium ${loading ? 'text-gray-500' : 'text-gray-700'} mb-1`}>Passengers</label>
          <input
            type="number"
            {...form.register("passengers", { valueAsNumber: true })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              form.formState.errors.passengers ? "border-red-500" : "border-gray-300"
            } ${loading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            disabled={loading}
          />
          {form.formState.errors.passengers && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.passengers.message}</p>
          )}
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading 
                ? "bg-blue-400 text-white cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                Loading...
              </div>
            ) : "Search Flights"}
          </button>
        </div>
      </form>
  </div>
  )
}
