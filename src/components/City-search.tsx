import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { usesearchHistory } from "@/hooks/useSearchHistory";
import { format } from "date-fns";
import { useFavorite } from "@/hooks/useFavorite";

function CitySearch() {
  const [open, setopen] = useState(false);
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  const { data: locations, isLoading } = useLocationSearch(query);

  const { history, clearHistory, addToHistory } = usesearchHistory();

  const handleSelect = (cityData: string) => {
    const [lon, lat, name, country] = cityData.split("|");

    //Add to search history
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setopen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const {favorites} = useFavorite()
  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setopen(true)}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities
      </Button>
      <CommandDialog open={open} onOpenChange={setopen}>
        <CommandInput
          placeholder="Serach city..."
          value={query}
          onValueChange={setquery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}
          {favorites.length > 0 && (
              <CommandGroup heading="Favorites">
                {favorites.map((location) => {
                  return (
                    <CommandItem
                      key={location.id}
                      value={`${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {location.country}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
          )}
          <CommandSeparator />

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p>Recent Searches</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4 " />
                    clear
                  </Button>
                </div>
                {history.map((location) => {
                  return (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {location.country}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ,{format(location.searchedAt, "MM d, h:mm a")}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {Array.isArray(locations) && locations.length > 0 && (
            <CommandGroup heading="Suggestion">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                console.log(location);

                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lon}|${location.lat}| ${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default CitySearch;
