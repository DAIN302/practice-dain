import React, { useRef } from "react";
import { useEffect } from "react";

interface BaseStatProps {
  valueStat: number;
  nameStat: string;
  type: string;
}

const BaseStat = ({ valueStat, nameStat, type }: BaseStatProps) => {
  const bg = `bg-${type}`;

  // ref 를 div element 에 주었기 때문에 HTMLDivElement 타입을 준다.
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // stat만큼 배경색이 채워지게 하는 계산
    const setValueStat = ref.current;
    const calc = valueStat * (100 / 255);
    // type guard -> setValueStat 이 null 이 아닐때만 스타일 적용 시키기 위해 가드
    if (setValueStat) {
      setValueStat.style.width = calc + "%";
    }
  }, []);

  return (
    <tr className="w-full text-white">
      <td className="sm:px-5">{nameStat}</td>
      <td className="px-2 sm:px-3">{valueStat}</td>
      <td>
        <div
          className={`flex items-start h-2 min-w-[10rem] bg-gray-600 rounded overflow-hidden`}
        >
          <div className={`h-3 ${bg}`} ref={ref}></div>
        </div>
      </td>
      <td className="px-2 sm:px-5">255</td>
    </tr>
  );
};

export default BaseStat;
