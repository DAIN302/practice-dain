import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface Props {
  center: {
    // 위도 & 경도
    lat: number;
    lng: number;
  };
  markers?: {
    lat: number;
    lng: number;
  }[];
}

// 구글 맵 연동 컴포넌트
export default function Map({ center, markers = [] }: Props) {
  return (
    //  api 키 가져오기
    <LoadScript googleMapsApiKey={API_KEY}>
        {/*  구글 맵 정보 가져오기 center에서 위도, 경도 정보 입력
        zoom 으로 확대되는 정도 가져오기 */}
      <GoogleMap
        center={center}
        zoom={12}
        mapContainerClassName="w-full h-full"
      >
        {/* 지도에 마커 표시 */}
        {markers.map((marker, i) => (
          <MarkerF
            key={i}
            position={marker}
            icon={markerIcon}
            label={{ text: `${i + 1}`, color: "#fff" }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

// 커스텀 마커 추가
const markerIcon = (() => {
  const svg = `
    <svg width="30" height="30" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="15" fill="#c730df" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
})();
