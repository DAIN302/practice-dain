import { useState } from "react";
import SearchInput from "../common/SearchInput";
import { Place } from "@/types";
import PlaceFilter from "./PlaceFilter";
import PlaceList from "./PlaceList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPlaces } from "@/service/plan";
import Loading from "../common/Loading";
import { usePlanStore } from "@/store";

export default function PlaceContainer() {
  const { city } = useParams();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Place["category"] | null>(null);

  const { addPlannedPlace } = usePlanStore();

  // react-query
  const { isLoading, data } = useQuery({
    queryKey: ["places", city, q, filter],
    enabled: !!city,
    queryFn: () => {
      const query = {
        ...(q ? { q } : {}),
        ...(filter ? { category: filter } : {}),
      };
      return getPlaces(city!, query);
    },
  });

  // 필터 선택 함수
  const handleFilter = (category: Place["category"]) => {
    if (filter === category) {
      // 필터 초기화
      setFilter(null);
    } else {
      setFilter(category);
    }
  };

  return (
    <div className="flex flex-col gap-y-18 h-full">
      {/* 서치 인풋 */}
      <SearchInput onSearch={(query) => setQ(query)} />
      {/* 필터 */}
      <PlaceFilter selected={filter} onFilter={handleFilter} />
      {/* 리스트 */}
      <div className="flex-1 overflow-y-hidden">
        {isLoading || !data ? <Loading /> : <PlaceList places={data} onAddPlace={(place:Place) => addPlannedPlace(place, 120)} />}
      </div>
    </div>
  );
}
