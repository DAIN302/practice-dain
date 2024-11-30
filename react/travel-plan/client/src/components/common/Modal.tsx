import { PropsWithChildren } from "react";

// 모달 컴포넌트
export default function Modal({ children }: PropsWithChildren) {
  return <div className="fixed inset-0 w-full h-full">{children}</div>;
}

// 모달 뒷 배경
export function ModalBackdrop() {
  return <div className="fixed inset-0 w-full h-full bg-[rgba(1,1,1,0.50)] -z-10" />;
}

// 모달 데이터를 담는 곳
export function ModalPanel({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      {children}
    </div>
  );
}
