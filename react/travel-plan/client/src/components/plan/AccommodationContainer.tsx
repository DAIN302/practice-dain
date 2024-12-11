import { useState } from "react";
import SearchInput from "../common/SearchInput";
import { Place } from "@/types";
import PlaceList from "./PlaceList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPlaces } from "@/service/plan";
import Loading from "../common/Loading";
import { usePlanStore } from "@/store";

export default function AccommodationContainer() {
  const { city } = useParams();
  const [q, setQ] = useState("");
  const { addPlannedAccommodation } = usePlanStore();

  // react-query
  const { isLoading, data } = useQuery({
    queryKey: ["places", city, q],
    enabled: !!city,
    queryFn: () => {
      const query = {
        ...(q ? { q } : {}),
        ...{ category: "accommodation" },
      };
      return getPlaces(city!, query);
    },
  });

  return (
    <div className="flex flex-col gap-y-18 h-full">
      {/* 서치 인풋 */}
      <SearchInput onSearch={(query) => setQ(query)} />
      {/* 리스트 */}
      <div className="flex-1 overflow-y-hidden">
        {isLoading || !data ? (
          <Loading />
        ) : (
          <PlaceList
            places={data}
            onAddPlace={(place: Place) => addPlannedAccommodation(place)}
          />
        )}
      </div>
    </div>
  );
}
