import { useRef } from 'react';

export default function useThrottle() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (callback: () => void, ms: number) => {
    if (timer.current) {
      return;
    }

    timer.current = setTimeout(() => {
      callback();
      timer.current = null;
    }, ms);
  };
}
