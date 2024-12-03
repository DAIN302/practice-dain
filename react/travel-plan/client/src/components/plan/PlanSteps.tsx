import cn from "classnames";
import Button from "../common/Button";

export default function PlanSteps() {
  const currentStep = 0;
  return (
    <div className="flex flex-col justify-between items-center py-50 px-20">
      <ul className="w-78 flex flex-col gap-y-30">
        {steps.map((step, index) => {
          const actvie = index === currentStep;
          return (
            <li
              key={index}
              className={cn("text-15 font-semibold leading-[1.5]", {
                "text-main": actvie,
                "text-gray300": !actvie,
              })}
            >
              STEP {index + 1} <br />
              {step.text}
            </li>
          );
        })}
      </ul>
      <Button className="px-36">다음</Button>
    </div>
  );
}

// steps data
const steps = [
  { text: "날짜 확인" },
  { text: "장소 선택" },
  { text: "숙소 선택" },
];
