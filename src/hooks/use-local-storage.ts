import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,initialValue:T){
    const[storevalue,setstorevalue]=useState<T>(()=>{
        try {
            const item = window.localStorage.getItem(key);
            return item? JSON.parse(item):initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    })
    useEffect(()=>{
        try {
            window.localStorage.setItem(key, JSON.stringify(storevalue));
        } catch (error) {
            console.log(error);
            
        }
    },[key,storevalue])

    return [storevalue, setstorevalue] as const ;
}