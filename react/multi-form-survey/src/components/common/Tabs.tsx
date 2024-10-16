import { createContext, PropsWithChildren, useContext, useState } from "react";
import cn from "classnames";

export default function Tabs({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState(0); // 인덱스 값을 갖는 state
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col">{children}</div>
    </TabContext.Provider>
  );
}

// context 생성
const TabContext = createContext({
  activeTab: 0,
  setActiveTab: (_: number) => {},
});

// 탭을 가지는 레이아웃
export function TabList({ children }: PropsWithChildren) {
  return <div className="flex gap-x-20 justify-center">{children}</div>;
}

// 탭 버튼들
export function Tab({ children, index }: PropsWithChildren<{ index: number }>) {
  const { activeTab, setActiveTab } = useContext(TabContext);
  return (
    <button
      className={cn("border-b-3 p-14", {
        "text-main border-main": activeTab === index,
        "border-transparent text-gray-500": activeTab !== index,
      })}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

// 탭 패널들
export function TabpPanels({ children }: PropsWithChildren) {
  return <div className="flex-1">{children}</div>;
}

// 탭 컨텐츠
export function TabPanel({ children, index }: PropsWithChildren<{ index: number }>) {
  const { activeTab } = useContext(TabContext);  
  // 현재 인덱스와 같지 않으면 hidden  
  return <div hidden={index !== activeTab}>{children}</div>; 
}
