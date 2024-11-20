import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";


interface favoriteCity {
    id:string;
    name:string;
    query:string;
    lat: number;
    lon: number;
    country: string;
    state?:string;
    addedAt:number;
}

export function useFavorite(){
   const [favorites,setfavorites] = useLocalStorage<favoriteCity[]>("favorites",[]);

   const favoritesquery=useQuery({
    queryKey:["favorites"],
    queryFn:()=> favorites,
    initialData:favorites,
    staleTime:Infinity,
   });
    const queryClient = useQueryClient();

   const addToFavorites = useMutation({
mutationFn:async (city:Omit<favoriteCity, "id" |"addedAt">)=>{
    const newfavorite: favoriteCity = {
        ...city,
        id:`${city.lat}-${city.lon}`,
        addedAt:Date.now(),
    }
    const exists = favorites.some(
        (fav) =>fav.id === newfavorite.id
    );
    if(exists) return favorites;
    const newFavorites =[...favorites ,newfavorite].slice(0,10);

    setfavorites(newFavorites);
    return newFavorites;
},
onSuccess:()=>{
    queryClient.invalidateQueries({
        queryKey:['favorites'],
    })
}
   });

   const removeFavorites = useMutation({
    mutationFn:async (cityId:string )=>{
        const newfavorite = favorites.filter((city)=> city.id !== cityId)
        setfavorites(newfavorite);
        return newfavorite;
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:['favorites'],
        })
    }
   });
   return {
    favorites:favoritesquery.data,
    addToFavorites,
    removeFavorites,
    isFavorite:(lat:number,lon:number)=>
        favorites.some((city)=> city.lat === lat && city.lon === lon),
   }
}