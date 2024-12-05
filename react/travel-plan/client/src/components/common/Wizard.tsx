import { ReactNode, useState } from "react";
import Button from "./Button";
import cn from "classnames";

type Step = {
  title: string;
  content: ({ onNext }: { onNext: () => void }) => ReactNode;
};

interface Props {
  steps: Step[];
}

// 내부에 현재 스텝이 몇번째인지 currentIndex 정보가 있어야 함
// 그 정보가 내부에서만 쓰이는지 외부에서도 쓰이는지에 따라서 상태 관리를 다르게 해주면 됨
export default function Wizard({ steps }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const onNext = () => {
    setCurrentStep((prev) => prev + 1); // 직전 값에서 +1
  };

  return (
    <div className="flex">
      <Steps
        steps={steps}
        currentStep={currentStep}
        onChangeStep={setCurrentStep}
      />
      {steps[currentStep].content({ onNext })}
    </div>
  );
}

function Steps({
  steps,
  currentStep,
  onChangeStep,
}: {
  steps: Step[];
  currentStep: number;
  onChangeStep: (index: number) => void;
}) {
  return (
    <div className="flex flex-col justify-between items-center py-50 px-20 w-140">
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
              <button onClick={() => onChangeStep(index)}>
                STEP {index + 1} <br />
                {step.title}
              </button>
            </li>
          );
        })}
      </ul>
      {currentStep < steps.length - 1 && (
        <Button className="px-36 w-full" onClick={() => onChangeStep(currentStep + 1)}>
          다음
        </Button>
      )}
    </div>
  );
}
