import { usePlanStore } from "@/store";
import DailyTimeSelecotor from "./DailyTimeSelecotor";
import PlanSteps from "./PlanSteps";
import PlanControllerHeader from "./PlanControllerHeader";

export default function PlanController() {
  const { startDate, endDate } = usePlanStore();

  return (
    <div className="h-full flex">
      {/* step 선택 영역 */}
      <PlanSteps />
      {/* 컨텐츠 영역 */}
      <div className="px-24 py-30 flex flex-col gap-y-18">
        <PlanControllerHeader startDate={startDate} endDate={endDate} />
        <DailyTimeSelecotor />
      </div>
    </div>
  );
}
