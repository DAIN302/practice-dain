import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  // ref - useRef, handler - state 변경 함수
  useEffect(() => {
    const listener = (event) => {
      // 모달 내부 클릭 시
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // 모달 바깥 클릭 시
      handler();
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
