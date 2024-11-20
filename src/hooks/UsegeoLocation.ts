import { Coordinate } from "@/api/types";

import { useEffect, useState } from "react";

interface Geolocationstate {
    coordinates :  Coordinate | null;
    error :string | null;
    isloading: boolean;
}


export function UseGeolocation(){
    const [locatinData,setlocationData]=useState<Geolocationstate>({
        coordinates:null,
        error: null,
        isloading:true,
    });

    const getLocation=()=>{
        setlocationData((prev) => ({ ...prev, isloading:true , error:null}));

        if(!navigator.geolocation){
            setlocationData({
                coordinates:null,
                error:"Geolocation is not supported by your browser",
                isloading:false,
            });
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setlocationData({
                coordinates:{
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                },
                error:null,
                isloading:false,
            })
        },(error)=>{
            let errorMessage:string;

            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = 
                    "Location permission denied. please enable location access";
                break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailble";
                break;
                case error.TIMEOUT:
                    errorMessage ="Location request timed out.";
                break;
                default:
                    errorMessage="An unknown error occurred";
           }

           setlocationData({
            coordinates:null,
            error:errorMessage,
            isloading:false,
           });
        },{
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0,
        })
    }
    useEffect(()=>{
        getLocation();
    },[])
    return {
        ...locatinData,getLocation
    }
}