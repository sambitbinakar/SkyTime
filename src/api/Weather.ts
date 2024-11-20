
import { API_CONFIG } from "./config";
import { Coordinate, foarcastData, weatherData,GeocodingResponse } from "./types";

class WeatherAPI {
    private createUrl(endpoint:string, params: Record<string,string|number>){
        const searchParams =  new URLSearchParams({
            appid:API_CONFIG.API_KEY,
            ...params,
        });
        return `${endpoint}?${searchParams.toString()}`
    }
    private async fetchData<T>( url:string):Promise<T> {
        const response = await fetch(url);


        if(!response.ok){
            throw new Error(`weather Api ERROR :${response.statusText}`)
        }

        return response.json();
    }

    async getCurrentWeather({lat,lon}:Coordinate):Promise<weatherData>{
        const url =this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
        }

    )
    return this.fetchData<weatherData>(url);
    }
    async getForecast({lat,lon}:Coordinate):Promise<foarcastData>{
        const url =this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
        }

    )
    return this.fetchData<foarcastData>(url);
    } 


    async reverseGeocode({lat,lon}:Coordinate):Promise<GeocodingResponse>{
        const url =this.createUrl(`${API_CONFIG.GEO}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limit:1,
        }

    )
    return this.fetchData<GeocodingResponse>(url);
    } 


    async searchLocation(query:string):Promise<GeocodingResponse>{
        const url =this.createUrl(`${API_CONFIG.GEO}/direct`,{
            q:query,
            limit:1,
        });
    return this.fetchData<GeocodingResponse>(url);
    } 

}


export const weatherAPI = new WeatherAPI()