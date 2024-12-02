import TravelPeriodModal from "@/components/plan/TravelPeriodModal";
import { usePlanStore } from "@/store";

export default function PlanCity() {
  const { status } = usePlanStore();
  return status === 'period_editing' && <TravelPeriodModal />;
}
