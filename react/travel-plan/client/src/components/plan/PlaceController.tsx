import { Place } from "@/types";
import PlannedPlaceList from "./PlannedPlaceList";
import { usePlanStore } from "@/store";

export default function PlaceController() {
  const { plannedPlaces } = usePlanStore();

  return (
    <div className="flex flex-col text-left">
      <h5 className="flex items-end mb-13">
        <span className="text-30 font-medium tracking=[0.3px]">0</span>
        <span className="text-15 tracking-[0.15px] mb-4">
          1시간 0분 / 36시간 0분
        </span>
      </h5>
      {/* 컨테이너 리스트 */}
      {plannedPlaces.length === 0 ? (
        <EmptyList />
      ) : (
        <PlannedPlaceList plannedPlaces={plannedPlaces} />
      )}
    </div>
  );
}

function EmptyList() {
  return (
    <div className="w-[430px] h-89 rounded-10 bg-bg">
      <p className="mt-70 mx-auto text-14 text-gray500 text-center">장소를 선택해 주세요</p>
    </div>
  );
}
