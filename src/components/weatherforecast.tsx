import { foarcastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface WeatherForecastProps{
    data:foarcastData;
}

interface DailyForecast {
    date:number;
    temp_max:number;
    temp_min:number;
    humidity:number;
    wind:number;
    weather: {
        id:number;
        main:string;
        description:string;
        icon : string;
    };
}

function WeatherForecast({data}:WeatherForecastProps) {

    const dailyForecasts = data.list.reduce((acc,forecast)=>{
        const date = format(new Date(forecast.dt *1000), "yyyy-MM-dd");

        if(!acc[date]){
            acc[date]={
                temp_min :forecast.main.temp_min,
                temp_max :forecast.main.temp_max,
                humidity :forecast.main.humidity,
                wind:forecast.wind.speed,
                weather:forecast.weather[0],
                date: forecast.dt,
            };
        }else{
            acc[date].temp_min =Math.min(acc[date].temp_min, forecast.main.temp_min)
            acc[date].temp_max =Math.max(acc[date].temp_min, forecast.main.temp_max)
        }
        return acc;
    },{} as Record<string,DailyForecast>);

    const nextDays = Object.values(dailyForecasts).slice(0,6);
    
    const formatTemp = (temp:number)=>`${Math.round(temp-273.15)}°`

  return (
    <Card>
        <CardHeader>
            <CardTitle>6-day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                {nextDays.map((day)=>{
                 return   <div key={day.date} className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4">
                    <div className="">
                        <p className="font-medium">{format(new Date(day.date *1000), "EEE, MMM d")}</p>
                        <p className="text-sm text-muted-foreground capitalize">{day.weather.description}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <span className="flex items-center text-blue-400">
                        <ArrowDown className="mr-1 h-4 w-4"/>
                        {formatTemp(day.temp_max)}</span>
                        <span className="flex items-center text-blue-400">
                        <ArrowUp className="mr-1 h-4 w-4"/>
                        {formatTemp(day.temp_min)}</span>
                    </div>
                    <div className="flex justify-end gap-4">
                        <span className="flex items-center gap-1">
                            <Droplet className="h-4 w-4 text-blue-400"/>
                            <p className="text-sm">{day.humidity}%</p>
                        </span>
                        <span className="flex items-center gap-1">
                            <Wind className="h-4 w-4 text-blue-400"/>
                            <p className="text-sm">{day.wind}%</p>
                        </span>
                    </div>
                 </div>
                })}
            </div>
        </CardContent>
    </Card>
  )
}

export default WeatherForecast