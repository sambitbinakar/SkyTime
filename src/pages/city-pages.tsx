import CurrentWeather from "@/components/current_weather";
import FavoritesButton from "@/components/FavoritesButton";
import HourlyTemprature from "@/components/hourly-temprature";
import WeatherSkeleton from "@/components/Loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetail from "@/components/weatherDetail";
import WeatherForecast from "@/components/weatherforecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"


function Citypages() {

  const[searchParams] = useSearchParams();
  const params = useParams();
  const lat =parseFloat(searchParams.get("lat")|| "0");
  const lon =parseFloat(searchParams.get("lon")|| "0");

  const coordinates = {lat ,lon};

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if(weatherQuery.error || forecastQuery.error){
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4 "/>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Failed to load weather data . Please try again.</AlertDescription>
    </Alert>
  )
}
if(!weatherQuery.data || !forecastQuery.data || !params.cityName){
return <WeatherSkeleton/>
}
return (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight">{params?.cityName}, {weatherQuery.data.sys.country}</h1>
      <div className=""><FavoritesButton data={{...weatherQuery.data, name: params.cityName}}/></div>
    </div>
    <div className="grid gap-6">
      <div className="flex flex-col gap-4">
        <CurrentWeather data={weatherQuery.data} />
        <HourlyTemprature data={forecastQuery.data}/>
      </div>
      <div className="grid gap-6 md:grid-cols-2 items-start">
        <WeatherDetail data={weatherQuery.data} />

        <WeatherForecast data={forecastQuery.data}/>
      </div>
    </div>
  </div>
)
}

export default Citypages