"use client" // Enables client-side rendering for this component

// Importing useState, ChangeEvent, and FormEvent from React
import { useState, ChangeEvent, FormEvent } from "react"

// Import Custom ui components for ui directory
import{
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Imprt icons from the lucide React Libaray
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react"

// Define a typescript interface for the weather data
interface WeatherData {
    temperature: number // temperature in celsius
    description: string // weather description
    location: string // location 
    humidity: number // humidity percentage
    unit: string // unit of measurement
}


// Default exprt of the weathter widget component function
export default function WeatherWidget(){
    // State hook for managing location input, weather data, error message, and loading state
    const [location, setLocation] = useState<string>("") // State for location input
    const [weather, setWeather] = useState<WeatherData | null>(null) 
    const [error, setError] = useState<string | null>(null) // State for error message
    const [isLoading, setIsLoading] = useState<boolean>(false) // State for loading state

    // Function ti handle the serach from submision
    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault() // Prevent default form submission        

        const trimmedLocation = location.trim() // Trim whitespace from location input
            if(trimmedLocation === ""){
                setError("Please enter a location") // set error message
                setWeather(null)
                return
            }

        setIsLoading(true) // Set loading state to true
        setWeather(null) // Set weather data to null


        try{
            // Fetch weathter data from weather api using provided location
            const respone = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${trimmedLocation}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
            );
            if(!respone.ok){
                throw new Error("City not found") // Throw error if city not found
        }

        const data = await respone.json(); // Parse the JSON response
        const weatherData: WeatherData = {
            temperature: data.current.temp_c,
            description: data.current.condition.text,
            location: data.location.name,
            humidity: data.current.humidity,
            unit: "C",
        }
        setWeather(weatherData) // Set weather data
    } catch (error) {
        console.error("Error fetching weather data:", error)
        setError("Error fetching weather data city not found")
        setWeather(null) // clear prevoius weather data
    } finally {
        setIsLoading(false) // Set loading state to false
    }
}


// function to get a tem messag based on the temparecre valeue and unit
function getTemperatureMessage(temperature: number, unit: string): string {
    if(unit === "C"){
        if(temperature < 0){
            return `ITs freezing at ${temperature}°C ! Bundele up`;
        } else if (temperature < 10){
            return `its a quite cold at ${temperature} wear warm clothes`;
        } else if(temperature < 20) {
            return `its tem is ${temperature}°C comrt for wear noraml` ;
        } else if(temperature < 30){
            return `ist a best ${temperature} C enjoy a nice weather!`
        } else {
            return `its a hot day at ${temperature}°C stay hydrated!`
        }
        } else {
            return `${temperature} ${unit}`;
        }
        
    }


    function getWeatherMessage(description: string): string {
      switch (description.toLowerCase()){
        case "sunny":
            return "its sunny day enjoy a nice weather";
        case "partly cloudy":
            return "its cloudy day enjoy a nice weather";
        case "cloudy":
            return "its cloudy day enjoy a nice weather";
        case "overcast":
            return "its cloudy day enjoy a nice weather";
        case "mist":
            return "its cloudy day enjoy a nice weather";
        case "fog":
            return "its cloudy day enjoy a nice weather";
        default:
            return description; // default return the description as it is 


      }
    }

    function getLocationMessage(location: string): string {
            const currentHour = new Date().getHours();
            const isNight = currentHour < 6 || currentHour > 18;

            return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
    }

    return (
        <div className="flex justify-center items-center h-screen">
          {/* Center the card within the screen */}
          <Card className="w-full max-w-md mx-auto text-center">
            {/* Card header with title and description */}
            <CardHeader>
              <CardTitle>Weather Widget</CardTitle>
              <CardDescription>
                Search for the current weather conditions in your city.
              </CardDescription>
            </CardHeader>
            {/* Card content including the search form and weather display */}
            <CardContent>
              {/* Form to input and submit the location */}
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Enter a city name"
                  value={location}
                  onChange={
                    (e: ChangeEvent<HTMLInputElement>) =>
                      setLocation(e.target.value) // Update location state on input change
                  }
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Search"}{" "}
                  {/* Show "Loading..." text while fetching data */}
                </Button>
              </form>
              {/* Display error message if any */}
              {error && <div className="mt-4 text-red-500">{error}</div>}
              {/* Display weather data if available */}
              {weather && (
                <div className="mt-4 grid gap-2">
                  {/* Display temperature message with icon */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <ThermometerIcon className="w-6 h-6" />
                      {getTemperatureMessage(weather.temperature, weather.unit)}
                    </div>
                  </div>
                  {/* Display weather description message with icon */}
                  <div className="flex items-center gap-2">
                    <CloudIcon className="w-6 h-6 " />
                    <div>{getWeatherMessage(weather.description)}</div>
                  </div>
                  {/* Display location message with icon */}
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-6 h-6 " />
                    <div>{getLocationMessage(weather.location)}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }













    


