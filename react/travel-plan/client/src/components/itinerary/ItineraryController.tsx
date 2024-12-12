import { PlanState, usePlanStore } from "@/store";
import ControllerHeader from "../shared/ControllerHeader";
import Tabs from "../common/Tabs";
import DayItineraryView from "./DayItineraryView";

interface Props {
  itinerary: PlanState["plannedPlaces"][];
}

export default function ItineraryController({ itinerary }: Props) {
  const { startDate, endDate } = usePlanStore();
  return (
    <div className="h-full flex">
      <Tabs
        tabs={itinerary.map((day, index) => ({
          title: `${index + 1}일차`,
          content: () => (
            <div className="h-full flex flex-1">
              <div className="px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full shrink-0">
                <ControllerHeader startDate={startDate} endDate={endDate} />
                <DayItineraryView plannedPlaces={day} />
              </div>
            </div>
          ),
        }))}
      />
    </div>
  );
}
