import { usePlanStore } from "@/store";
import DailyTimeController from "./DailyTimeController";
import PlanControllerHeader from "./PlanControllerHeader";
import Wizard from "../common/Wizard";
import { PropsWithChildren } from "react";
import PlaceController from "./PlaceController";
import PlaceContainer from "./PlaceContainer";

export default function PlanController() {
  const { startDate, endDate } = usePlanStore();

  return (
    <div className="h-full flex">
      {/* step 선택 영역 */}
      <Wizard
        steps={[
          {
            title: "날짜 확인",
            content: ({ onNext }) => (
              <div className="px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full">
                <PlanControllerHeader startDate={startDate} endDate={endDate} />
                <DailyTimeController onCompleted={onNext} />
              </div>
            ),
          },
          {
            title: "장소 선택",
            content: () => (
              <div className="flex">
                {/* 장소 선택 */}
                <div className="px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full">
                  <PlanControllerHeader
                    startDate={startDate}
                    endDate={endDate}
                  />
                  <div className="h-full">
                    {/* 헤더 */}
                    <div className="p-14 border-b-3 border-b-main mb-18">
                      <h4 className="text-main text-18 font-semibold">
                        장소 선택
                      </h4>
                    </div>
                    {/* 바디 */}
                    <PlaceContainer />
                  </div>
                </div>
                {/* 장소 선택 후 확인 */}
                <div className="px-24 py-30">
                  <PlaceController />
                </div>
              </div>
            ),
          },
          {
            title: "숙소 선택",
            content: () => (
              <div className="px-24 py-30 flex flex-col gap-y-18 overflow-y-hidden h-full">
                <PlanControllerHeader startDate={startDate} endDate={endDate} />
                <div>숙소 선택</div>
              </div>
            ),
          },
        ]}
      />
      {/* 컨텐츠 영역 */}
      {/* <div className="px-24 py-30 flex flex-col gap-y-18">
        <PlanControllerHeader startDate={startDate} endDate={endDate} />
      </div> */}
    </div>
  );
}
