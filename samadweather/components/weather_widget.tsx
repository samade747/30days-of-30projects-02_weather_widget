"use client" // Enables client-side rendering for this component

// Importing useState, ChangeEvent, and FormEvent from React
import { useState, ChangeEvent, FormEvent } from "react"

// Import Custom ui components for ui directory
import{
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContnet,
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
        s
    }












    
}

