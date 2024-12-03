import WideLayout from "@/components/common/WideLayout";
import PlanController from "@/components/plan/PlanController";
import TravelPeriodModal from "@/components/plan/TravelPeriodModal";
import { usePlanStore } from "@/store";

export default function PlanCity() {
  const { status } = usePlanStore();
  return (
    <>
      {status === "period_editing" && <TravelPeriodModal />}
      <WideLayout>
        <div className="flex h-full">
          {/* 컨트롤러 영역 */}
          <PlanController />
          {/* 지도 영역 */}
          <div className="flex-1 bg-gray300">지도 영역</div>
        </div>
      </WideLayout>
    </>
  );
}
