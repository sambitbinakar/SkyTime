import { Coordinate } from "@/api/types";
import { weatherAPI } from "@/api/Weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS={
    weather:(coords:Coordinate)=>['weather',coords] as const,
    forecast:(coords:Coordinate)=>['forecast',coords] as const,
    location:(coords:Coordinate)=>['location',coords] as const,
    search:(query:string)=>['location-search',query] as const,
}as const;

export function useWeatherQuery(coordinates:Coordinate | null){
   return useQuery({
        queryKey:WEATHER_KEYS.weather(coordinates ?? {lat:0,lon:0}),
        queryFn:()=>coordinates?weatherAPI.getCurrentWeather(coordinates):null,
        enabled:!!coordinates,
    }) 
}
export function useForecastQuery(coordinates:Coordinate | null){
   return useQuery({
        queryKey:WEATHER_KEYS.forecast(coordinates ?? {lat:0,lon:0}),
        queryFn:()=>coordinates?weatherAPI.getForecast(coordinates):null,
        enabled:!!coordinates,
    }) 
}
export function useReversegeocodeQuery(coordinates:Coordinate | null){
   return useQuery({
        queryKey:WEATHER_KEYS.location(coordinates ?? {lat:0,lon:0}),
        queryFn:()=>coordinates?weatherAPI.reverseGeocode(coordinates):null,
        enabled:!!coordinates,
    }) 
}

export function useLocationSearch(query:string){
    return useQuery({
        queryKey:WEATHER_KEYS.search(query),
        queryFn:()=>weatherAPI.searchLocation(query),
        enabled:query.length >=3,
    })
}