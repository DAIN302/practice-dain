import { usePlanStore } from "@/store";
import UpArrowIcon from "@/assets/icons/keyboard_arrow_up.svg?react";
import { useState } from "react";
import cn from "classnames";
import { format } from "date-fns";
import Button from "../common/Button";

export default function DailyTimeSelecotor() {
  const [hidden, setHidden] = useState(false);
  const { dailyTimes, setDailyTime } = usePlanStore();

  // 누적 시간 함수
  const totalTime = dailyTimes.reduce((acc, dailyTime) => {
    const dailyTotalTime =
      transformTimeToMinutes(dailyTime.endTime) -
      transformTimeToMinutes(dailyTime.startTime);

    return acc + dailyTotalTime;
  }, 0);

  return (
    <div className="text-left flex flex-col gap-y-18 w-[368px]">
      <p className="text-17 font-medium tracking-[0.17px] flex gap-x-16">
        <span>여행시간 상세 설명</span>
        <span className="text-[#5A88FF]">{formatMinutesToTime(totalTime)}</span>
        <button onClick={() => setHidden((prev) => !prev)}>
          <UpArrowIcon className={cn({ "rotate-180": !hidden })} />
        </button>
      </p>
      {!hidden && (
        <>
          <p className="text-15 leading-[1.7] -tracking-[0.09px]">
            입력하신 여행 기간이 시차를 고려한 현지 여행 기간이 맞는지 확인해
            주시고 각 날짜의 일정 시작시간과 종료시간을 현지 시간기준으로
            설정해주세요. 기본 설정 시간은 오전 10시~오후 10시 총 12시간입니다.
          </p>
          <table className="text-15 text-center mb-36">
            <thead>
              <tr className="bg-bg">
                <th className="py-10 px-20">일자</th>
                <th className="py-10 px-20">요일</th>
                <th className="py-10 px-32">시작시간</th>
                <th className="py-10 px-32">종료시간</th>
              </tr>
            </thead>
            <tbody className="before:content-[''] before:block before:h-6">
              {dailyTimes.map((dailyTime, index) => (
                <tr key={index}>
                  <td className="py-10">{format(dailyTime.date, "M/dd")}</td>
                  <td className="py-10">{format(dailyTime.date, "EEE")}</td>
                  <td className="py-10">
                    <input
                      type="time"
                      value={dailyTime.startTime}
                      onChange={(e) => {
                        setDailyTime(index, e.currentTarget.value, "startTime");
                      }}
                    />
                  </td>
                  <td className="py-10">
                    <input
                      type="time"
                      value={dailyTime.endTime}
                      onChange={(e) => {
                        setDailyTime(index, e.currentTarget.value, "endTime");
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <Button className="px-47">시간 설정 완료</Button>
          </div>
        </>
      )}
    </div>
  );
}

// 분 단위로 환산해서 계산
const transformTimeToMinutes = (time: string) => {
  return parseInt(time.slice(0, 2), 10) * 60 + parseInt(time.slice(3), 10);
};

// 시 단위로 환산해서 계산
const formatMinutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return `총 ${hours}시간 ${String(remainMinutes).padStart(2, "0")}분`;
};
