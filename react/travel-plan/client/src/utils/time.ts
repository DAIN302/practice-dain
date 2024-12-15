// 분 단위로 환산해서 계산
export const transformTimeToMinutes = (time: string) => {
  return parseInt(time.slice(0, 2), 10) * 60 + parseInt(time.slice(3), 10);
};

// 시 단위로 환산해서 계산
export const parseTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = Math.floor(minutes % 60);
  return {
    hours,
    minutes: remainMinutes,
  };
};

// 시간 표시
export const printTime = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => {
  return `${hours}시간 ${minutes}분`;
};

// 누적 시간 함수
export const getTotalTime = (
  times: {
    startTime: string;
    endTime: string;
  }[]
) => {
  return times.reduce((acc, dailyTime) => {
    const dailyTotalTime =
      transformTimeToMinutes(dailyTime.endTime) -
      transformTimeToMinutes(dailyTime.startTime);

    return acc + dailyTotalTime;
  }, 0);
};

// 시간 표시
export const timeToString = ({
  hours,
  minutes,
}: {
  hours: number;
  minutes: number;
}) => {
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
};