import Loading from "@/components/common/Loading";
import WideLayout from "@/components/common/WideLayout";
import PlanController from "@/components/plan/PlanController";
import PlanMapContainer from "@/components/plan/PlanMapContainer";
import TravelPeriodModal from "@/components/plan/TravelPeriodModal";
import { getCity } from "@/service/plan";
import { usePlanStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function PlanCity() {
  const { status } = usePlanStore();
  // path 에서 도시 구분자 가져오기
  const { city: cityId = "" } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["city", cityId],
    queryFn: () => getCity(cityId),
  });

  return (
    <>
      {status === "period_editing" && <TravelPeriodModal />}
      <WideLayout>
        {isLoading || !data ? (
          <Loading />
        ) : (
          <div className="flex h-full">
            {/* 컨트롤러 영역 */}
            <PlanController />
            {/* 지도 영역 */}
            <div className="flex-1 bg-gray300">
              <PlanMapContainer coordinates={data.coordinates} />
            </div>
          </div>
        )}
      </WideLayout>
    </>
  );
}
