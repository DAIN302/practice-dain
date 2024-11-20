import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  // parents 와 children 렌더링 단계 분리 -> 레이아웃이 변경되더라도 children에 리렌더링 발생안하게 분리
  return (
    <div className="w-full min-h-full flex justify-center bg-bg overflow-scroll py-60">
      <main className="max-w-[655px] w-full relative">
        {children}
      </main>
    </div>
  );
}
