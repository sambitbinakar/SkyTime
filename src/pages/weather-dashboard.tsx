import CurrentWeather from "@/components/current_weather";
import HourlyTemprature from "@/components/hourly-temprature";
import WeatherSkeleton from "@/components/Loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { useForecastQuery, useReversegeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import { UseGeolocation } from "@/hooks/UsegeoLocation"
import { AlertCircle, MapPin, RefreshCw } from "lucide-react"
import WeatherDetail from "@/components/weatherDetail";
import WeatherForecast from "@/components/weatherforecast";
import FavoritesCities from "@/components/FavoritesCities";

function Weatherdashboard() {
const { coordinates,error:locationError ,getLocation,isloading:locationloading}= UseGeolocation();

const weatherQuery = useWeatherQuery(coordinates);
const forecastQuery = useForecastQuery(coordinates);
const locationQuery = useReversegeocodeQuery(coordinates);


const handleRefresh=()=>{
  getLocation();
  if(coordinates){
    weatherQuery.refetch();
    forecastQuery.refetch();
    locationQuery.refetch();
  }
}
if(locationloading){
  return <WeatherSkeleton />
}
if(locationError){
  return(
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Loation Error</AlertTitle>
    <AlertDescription>
      <p>{locationError}</p>
      <Button onClick={getLocation} variant={"outline"} className="w-fit">
        <MapPin className="mr-2 w-4"/>
        Enable Location
      </Button>
    </AlertDescription>
  </Alert>
  );
}
if(!coordinates){
  return(
  <Alert variant="destructive">
    <AlertTitle>Loation Requird</AlertTitle>
    <AlertDescription>
      <p>Please enable location access to see your local weather</p>
      <Button onClick={getLocation} variant={"outline"} className="w-fit">
        <MapPin className="mr-2 w-4"/>
        Enable Location
      </Button>
    </AlertDescription>
  </Alert>
  );
}

const locationName = Array.isArray(locationQuery.data)? locationQuery.data[0] : undefined;



if(weatherQuery.error || forecastQuery.error){
  return(
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>Failed to fetch weather data. please try again</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <RefreshCw className="mr-2 w-4"/>
          retry
        </Button>
      </AlertDescription>
    </Alert>
    );
}

if (!weatherQuery.data || !forecastQuery.data){
  return <WeatherSkeleton/>
}
  return (
    <div className="space-y-4">
      <FavoritesCities/>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My location</h1>
        <Button variant={"outline"} size={"icon"} onClick={handleRefresh} disabled={weatherQuery.isFetching || forecastQuery.isFetching}>
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching?'animate-spin':""}`}/>
        </Button>
      </div>
      <div className="grid gap-6 w-full">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locationName}/>
          <HourlyTemprature data={forecastQuery.data}/>
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start w-full">
          <WeatherDetail data={weatherQuery.data} />

          <WeatherForecast data={forecastQuery.data}/>
        </div>
      </div>
    </div>
  )
}

export default Weatherdashboard