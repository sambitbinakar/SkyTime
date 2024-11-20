import { weatherData } from "@/api/types"
import { useFavorite } from "@/hooks/useFavorite"
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface favoriteButtonProps{
    data:weatherData
}

function FavoritesButton({data}:favoriteButtonProps) {
    
const {addToFavorites, isFavorite, removeFavorites}=useFavorite();
const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon)

const handlefavorite =()=>{
    if(isCurrentlyFavorite){
        removeFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
        toast.error(`Removed ${data.name} from Favorites `)
    }else{
        addToFavorites.mutate({
            name:data.name,
            lat:data.coord.lat,
            lon:data.coord.lon,
            country:data.sys.country,
            query: `${data.name}, ${data.sys.country}`,
        })
        toast.success(`Added ${data.name} to favorites`)
    }
}
  return (
    <Button variant={isCurrentlyFavorite ?"default":"outline"} size={"icon"} className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600":''} onClick={handlefavorite}>
        <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current":" "}`}/>
    </Button>
  )
}

export default FavoritesButton