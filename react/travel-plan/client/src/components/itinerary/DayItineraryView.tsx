import PlaceCategory from "../common/PlaceCategory";
import SubwayIcon from "@/assets/icons/directions_subway.svg?react";
import { ItineraryItem } from "@/types";

interface Props {
  plannedPlaces: ItineraryItem[];
}

export default function DayItineraryView({ plannedPlaces }: Props) {
  return (
    <div className="flex flex-col gap-y-50">
      {plannedPlaces.map(({ place, startTime, endTime }) => (
        <div className="flex w-[253px] pl-29 relative before:absolute before:w-1 before:h-69 before:top-35 before:left-10 before:block before:bg-gray200 last:before:h-0">
          {/* 대중교통 아이콘 */}
          <SubwayIcon className="absolute top-0 left-0" />
          {/* 정보 */}
          <div className="flex-1 flex flex-col gap-y-8 text-left">
            {/* 기간 */}
            <p className="text-14 text-gray500">
              {startTime} - {endTime}
            </p>
            {/* 장소 카테고리 */}
            <PlaceCategory category={place.category} className="text-13" />
            {/* 장소 이름 */}
            <p className="text-gray900 text-16 font-semibold">{place.name}</p>
          </div>
          {/* 썸네일 */}
          <img
            src={place.thumbnail}
            alt={place.name}
            className="w-75 h-55 shrink-0 rounded-6 bg-bg"
          />
        </div>
      ))}
    </div>
  );
}
