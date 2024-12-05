import WideLayout from "@/components/common/WideLayout";
import Map from "@/components/plan/Map";
import PlanController from "@/components/plan/PlanController";
import TravelPeriodModal from "@/components/plan/TravelPeriodModal";
import { usePlanStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export default function PlanCity() {
  const { status } = usePlanStore();
  const {} = useQuery();

  return (
    <>
      {status === "period_editing" && <TravelPeriodModal />}
      <WideLayout>
        <div className="flex h-full">
          {/* 컨트롤러 영역 */}
          <PlanController />
          {/* 지도 영역 */}
          <div className="flex-1 bg-gray300">
            <Map
              center={{ lat: 37.5665, lng: 126.978 }}
              markers={[
                { lat: 37.5796, lng: 126.977 },
                { lat: 37.5512, lng: 126.9882 },
              ]}
            />
          </div>
        </div>
      </WideLayout>
    </>
  );
}
