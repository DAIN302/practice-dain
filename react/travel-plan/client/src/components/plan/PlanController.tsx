import PlanSteps from "./PlanSteps";

export default function PlanController() {
  return (
    <div className="h-full flex">
        {/* step 선택 영역 */}
        <PlanSteps />
        {/* 컨텐츠 영역 */}
        <div></div>
    </div>
  )
}
