import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { PropsWithChildren } from "react";

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
export default function Map({ center, children }: PropsWithChildren<Props>) {
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
        {children}
      </GoogleMap>
    </LoadScript>
  );
}

// 마커
export function MapMarker({
  coordinates,
  label,
  options: { color = "#C730DF" } = {},
}: {
  coordinates: {
    lat: number;
    lng: number;
  };
  label?: string;
  options?: {
    color?: `#${string}`;
  };
}) {
  const markerIcon = generateMarkerIcon(color);

  return (
    <MarkerF
      position={coordinates}
      icon={markerIcon}
      label={label ? { text: label, color: "#fff" } : undefined}
    />
  );
}

// 경로 그려주는 함수
export function MapPath({
  path,
  options: { color = "#C730DF" } = {},
}: {
  path: { lat: number; lng: number }[];
  options?: { color?: `#${string}` };
}) {
  // 경로 그려주는 구글맵 제공 컴포넌트 PolylineF
  // props 로 위도, 경도 정보 배열 전달
  return <PolylineF path={path} options={{ strokeColor: color }} />;
}

// 커스텀 마커 추가
const generateMarkerIcon = (color: `#${string}`) => {
  const svg = `
    <svg width="30" height="30" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="15" fill="${color}" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
