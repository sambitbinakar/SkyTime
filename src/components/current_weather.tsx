import {GeocodingResponse,weatherData} from "@/api/types"
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface  CurrentWeatherProps{
    data:weatherData;
    locationName?:GeocodingResponse;
}


const CurrentWeather=({data,locationName}:CurrentWeatherProps)=>{
 const {
    weather:weather,
    main:{temp,feels_like,temp_min,temp_max,humidity},
    wind:{speed },
 }=data;
const [currentweather] =weather 
 const formatTemp = (temp:number)=>(`${Math.round(temp-273.15)}°`)

 return (
   <Card className="overflow-hidden">
     <CardContent className="p-6">
       <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
            <div className=" space-y-2">
                <div className="flex items-end gap-1">
                    <h2 className="text">{locationName?.name}</h2>
                    {locationName?.state && (
                    <span className="text-muted-foreground">, {locationName?.state}</span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">{locationName?.country}</p>
            </div>

            <div className="flex item-center gap-2">
              <p className="text-6xl font-bold tracking-tighter">{formatTemp(temp)}</p>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Feels like {formatTemp(feels_like)}</p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-600">
                    <ArrowDown className="h-3 w-3"/>
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className="h-3 w-3"/>
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <Droplet className="h-5 w-5 text-blue-500"/>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Wind className="h-5 w-5 text-blue-500"/>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{speed}m/s</p>
                </div>
              </div>
            </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
            <img src={`https://openweathermap.org/img/wn/${currentweather.icon}@4x.png`} alt="" />
            <div className="absolute bottom-0 text-center">
              <p className="text-sm font-medium capitalize">{currentweather.description}</p>
            </div>
          </div>
        </div>
       </div>
     </CardContent>
   </Card>
 );
}

export default CurrentWeather