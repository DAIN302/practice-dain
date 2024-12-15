export interface City {
  code: string; // 도시 코드, 구분자 역할 예) seoul
  name: string; // 도시의 한글 이름 예) 서울
  nameEn: string; // 도시의 영어 이름 예) Seoul
  thumbnail: string; // 도시 썸네일 이미지 url
  description: string;
  timezone: string; // 도시의 타임존 예) Asia/Seoul
  flightHour: number; // 서울로부터 비행시간
  timezoneOffset: number; // 시차
  coordinates: {
    // 위도, 경도
    lat: number;
    lng: number;
  };
  country: Country;
}

export interface Country {
  code: string; // 국가의 코드, 구분자 역할 예) kr
  name: string; // 국가의 한글 이름 예) 한국
  nameEn: string; // 국가의 영문 이름 예) Korea
  voltage: number; // 국가의 전압 예) 220
  visa: {
    required: boolean; // 비자 필요 여부
    duration: number; // 비자 유효 기간
  };
  continent: // 대륙 정보
  | "Asia"
    | "Europe"
    | "Africa"
    | "Oceania"
    | "North America"
    | "South America"
    | "Antarctica";
}

export interface Place {
  name: string; // 장소 이름
  thumbnail: string; // 장소 썸네일 이미지 url
  category: "attraction" | "restaurant" | "cafe" | "accommodation"; // 장소 카테고리 명소, 식당, 카페, 숙소
  address: string; // 장소 주소
  coordinates: {
    // 위도, 경도
    lat: number;
    lng: number;
  };
  likes: number; // 장소 좋아요 수
  rating: number; // 장소 평점
  city: City["code"];
}

export interface ItineraryItem {
  place: Place;
  duration: number; // 장소에 머무르는 시간
  startTime: string; // 시작 시간
  endTime: string; // 종료 시간
}
