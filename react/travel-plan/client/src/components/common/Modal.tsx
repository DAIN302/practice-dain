import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";

// 모달 컴포넌트
export default function Modal({ children }: PropsWithChildren) {
  return createPortal(
    <div className="fixed inset-0 w-full h-full">{children}</div>,
    document.body
  );
}

// 모달 뒷 배경
export function ModalBackdrop() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(1,1,1,0.50)] -z-10" />
  );
}

// 모달 데이터를 담는 곳
export function ModalPanel({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 ">
      <div
        className={cn(
          "rounded-20 border border-gray100 bg-white p-28",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
