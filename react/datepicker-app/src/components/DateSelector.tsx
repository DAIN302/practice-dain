import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { ko } from "date-fns/locale";
import "./DateSelector.css";

export default function DateSelector() {
  // 오늘 날짜
  const today = new Date();

  // 시작 일자, 종료 일자 상태 관리
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <>
      <div>
        {startDate !== null && <span>{`${formatDate(startDate)}`}</span>}
        {startDate !== null && endDate !== null && (
          <span>{` - ${formatDate(endDate)}`}</span>
        )}
      </div>
      <DatePicker
        inline
        monthsShown={2}
        selectsRange={true}
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        minDate={today}
        maxDate={
          startDate !== null && endDate === null
            ? new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + 10
              )
            : undefined
        }
        onChange={(date) => setDateRange(date)}
        locale={ko}
        dateFormatCalendar="yyyy년 M월"
      />
    </>
  );
}
