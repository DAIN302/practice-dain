import { PlanState } from "@/store";
import { ItineraryItem } from "@/types";
import { parseTime, timeToString, transformTimeToMinutes } from "@/utils/time";

// 커스텀 훅
export default function useGenerateItinerary() {
  return {
    generateItinerary,
  };
}

// 거리 계산
function getMatrix(
  locations: { lat: number; lng: number }[]
): Promise<google.maps.DistanceMatrixResponse> {
  const distanceMatrixService = new google.maps.DistanceMatrixService();

  // 비동기로 작성해서 응답이 돌아왔을 때 응답을 await 했다가 처리
  return new Promise((resolve, reject) => {
    // 구글 맵 API 에 request 요청
    const request: google.maps.DistanceMatrixRequest = {
      origins: locations, // 출발지
      destinations: locations, // 목적지
      travelMode: google.maps.TravelMode.TRANSIT, // 여행 수단 (대중교통으로 설정 - TRANSIT)
    };
    distanceMatrixService.getDistanceMatrix(request, (response, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        // 성공
        resolve(response!);
      } else {
        // 에러
        reject(status);
      }
    });
  });
}

// 매트릭스를 가져오는 함수
async function generateItinerary(
  places: PlanState["plannedPlaces"],
  dailyTimes: PlanState["dailyTimes"]
) {
  // 위도, 경도를 꺼내서 맵을 이용해서 locations 에 담기
  const locations = places.map(({ place }) => place.coordinates);

  const matrix = await getMatrix(locations);

  const route = findOptimalRoute(matrix);

  // 총 여행 시간
  // const times = dailyTimes.map(({ startTime, endTime }) => {
  //   const start = transformTimeToMinutes(startTime);
  //   const end = transformTimeToMinutes(endTime);
  //   return end - start;
  // });

  const itinerary = groupPlacesByDay({ route, places, matrix }, dailyTimes);

  return itinerary;
}

// 최적의 경로 찾는 함수 -> 가장 가까운 장소 연결
function findOptimalRoute(matrix: google.maps.DistanceMatrixResponse) {
  // 경로 등록 여부 확인
  // 경로의 총 갯수
  const length = matrix.rows.length;
  // 방문한 곳
  const visited = new Set<number>();
  // 기준
  const route = [0];
  visited.add(0);

  // 이미 방문한 곳(중복) 제거
  // 방문한 곳이 총 장소 보다 작을 때까지 반복
  while (visited.size < length) {
    // 최소
    let min = Infinity;
    // 다음 값 인덱스
    let next = -1;
    // 현재값
    // 가장 마지막에 추가된 장소를 가져와서 그 장소로부터 가장 가까운 distance 에 있는 장소를 다음 경로로 추가를 위해 설정
    const current = route[route.length - 1];

    // 장소들을 돌면서 남은 장소중에 가장 가까운 장소를 찾기
    for (let i = 0; i < length; i++) {
      if (visited.has(i)) {
        // visited 에 이미 있다면 해당 장소를 경로에 추가하지 않기
        continue;
      }

      // 현재 row로부터 얼마나 멀리 떨어져있는지 측정
      const distance = matrix.rows[current].elements[i].distance.value;

      if (distance < min) {
        // 현재 route가 더 가까운 상태 -> 해당 값 저장
        min = distance;
        next = i; // 현재 인덱스 저장
      }
    }

    // next 의 인덱스 값 체크
    if (next !== -1) {
      route.push(next);
      visited.add(next);
    }
  }
  return route;
}

// 임계치
const THRESHOLD = 10_000; // 10km

// 날짜마다 장소들을 분할
function groupPlacesByDay(
  {
    route,
    places,
    matrix,
  }: {
    route: number[];
    places: PlanState["plannedPlaces"];
    matrix: google.maps.DistanceMatrixResponse;
  },
  dailyTimes: PlanState["dailyTimes"]
) {
  const itinerary: ItineraryItem[][] = [];
  let dailyDuration = 0;
  let dailyTime = getDailyTimes(dailyTimes[0]);

  route.forEach((placeIndex, index) => {
    if (itinerary.length === 0) {
      const endTime =
        transformTimeToMinutes(dailyTimes[0].startTime) +
        places[placeIndex].duration;
      // 처음 경로 추가
      itinerary.push([
        {
          ...places[placeIndex],
          startTime: dailyTimes[0].startTime,
          endTime: timeToString(parseTime(endTime)),
          duration: places[placeIndex].duration,
        },
      ]);
      // duration 값 누적
      dailyDuration = places[placeIndex].duration;
      return;
    }

    // 경로에 등록된 마지막 장소 가져오기
    // 현재 일자
    const day = itinerary[itinerary.length - 1];
    const lastPlaceIndex = route[index - 1];
    // 직전에 등록된 장소부터 현재 등록된 장소까지의 거리 구하기
    const distance =
      matrix.rows[lastPlaceIndex].elements[placeIndex].distance.value;

    // 직전에 등록된 장소부터 현재 등록된 장소까지의 시간 구하기(이동 시간)
    const duration =
      matrix.rows[lastPlaceIndex].elements[placeIndex].duration.value / 60; // 분 단위로 변환을 위해 60 나누기

    dailyDuration += duration;

    // 거리가 10km 가 넘고, 일정 시간 넘으면 새로운 날로 등록하게 설정
    if (distance > THRESHOLD || dailyDuration > dailyTime) {
      dailyTime = getDailyTimes(dailyTimes[itinerary.length]);
      const endTime =
        transformTimeToMinutes(dailyTimes[0].startTime) +
        places[placeIndex].duration;

      itinerary.push([
        {
          ...places[placeIndex],
          startTime: dailyTimes[itinerary.length].startTime,
          endTime: timeToString(parseTime(endTime)),
        },
      ]);
      dailyDuration = places[placeIndex].duration;
    } else {
      const startTime =
        transformTimeToMinutes(dailyTimes[itinerary.length - 1].startTime) +
        dailyDuration;
      const endTime = startTime + places[placeIndex].duration;
      day.push({
        ...places[placeIndex],
        startTime: timeToString(parseTime(startTime)),
        endTime: timeToString(parseTime(endTime)),
      });
      dailyDuration += places[placeIndex].duration;
    }
  });

  // 사용자가 설정한 장소가 모자라서 여행 일정을 채울 수 없는 경우
  while (itinerary.length < dailyTimes.length) {
    // 장소 계획들을 나눠주는 작업 -> 가장 많이 계획이 등록된 날의 계획을 반으로 쪼개주기
    const max = itinerary.reduce((acc, day, index) => {
      if (day.length > itinerary[acc].length) {
        return index;
      }
      return acc;
    }, 0);

    if (itinerary[max].length === 1) {
      break;
    }

    const day = itinerary[max];
    const half = Math.floor(day.length / 2);
    itinerary[max] = day.slice(0, half);
    itinerary.push(day.slice(half));
  }

  return itinerary;
}

function getDailyTimes({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
  const start = transformTimeToMinutes(startTime);
  const end = transformTimeToMinutes(endTime);
  return end - start;
}
