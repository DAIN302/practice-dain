import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import './TravelDateSelector.css';

export default function TravelDateSelector() {
  // 오늘 날짜 이전을 선택하지 못하게 하기 위해 오늘 날짜 변수 지정
  const today = new Date();

  // 시작날짜
  const [startDate, setStartDate] = useState<Date | null>(null);
  // 종료날짜
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = ([start, end]: [Date | null, Date | null]) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      inline
      monthsShown={2}
      selectsRange
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
      locale={ko}
      dateFormatCalendar="yyyy년 M월"
      onChange={handleChange}
    />
  );
}
