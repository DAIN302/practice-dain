import { usePlanStore } from "@/store";
import DailyTimeController from "./DailyTimeController";
import PlanControllerHeader from "./PlanControllerHeader";
import Wizard from "../common/Wizard";
import { PropsWithChildren } from "react";

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
              <Layout startDate={startDate} endDate={endDate}>
                <DailyTimeController onCompleted={onNext} />
              </Layout>
            ),
          },
          {
            title: "장소 선택",
            content: () => (
              <Layout startDate={startDate} endDate={endDate}>
                <div>장소 선택</div>
              </Layout>
            ),
          },
          {
            title: "숙소 선택",
            content: () => (
              <Layout startDate={startDate} endDate={endDate}>
                <div>숙소 선택</div>
              </Layout>
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

function Layout({
  startDate,
  endDate,
  children,
}: PropsWithChildren<{ startDate: Date | null; endDate: Date | null }>) {
  return (
    <div className="px-24 py-30 flex flex-col gap-y-18">
      <PlanControllerHeader startDate={startDate} endDate={endDate} />
      {children}
    </div>
  );
}
