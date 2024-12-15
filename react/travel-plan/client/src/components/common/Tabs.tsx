import { ReactNode, useState } from "react";
import cn from "classnames";

type Tab = {
  title: string;
  content: () => ReactNode;
};

interface Props {
  className?: string;
  tabs: Tab[];
}

export default function Tabs({ tabs, className }: Props) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={cn("flex", className)}>
      <TabButtonList
        tabs={tabs}
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
      />
      {tabs[currentTab].content()}
    </div>
  );
}

function TabButtonList({
  tabs,
  currentTab,
  onChangeTab,
}: {
  tabs: Tab[];
  currentTab: number;
  onChangeTab: (index: number) => void;
}) {
  return (
    <div className="flex flex-col justify-between items-center py-50 px-20 w-140">
      <ul className="w-78 flex flex-col gap-y-30">
        {tabs.map((step, index) => {
          const actvie = index === currentTab;
          return (
            <li
              key={index}
              className={cn(
                "py-15 px-24 text-16 tracking-[0.16px] first:rounded-t-6 last:rounded-b-6",
                {
                  "text-white bg-black font-medium": actvie,
                  "text-black bg-bg": !actvie,
                }
              )}
            >
              <button onClick={() => onChangeTab(index)}>
                STEP {index + 1} <br />
                {step.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
