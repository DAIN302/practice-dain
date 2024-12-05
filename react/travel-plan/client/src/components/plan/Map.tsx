import { GoogleMap, LoadScript } from "@react-google-maps/api";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface Props {
  center: {
    // 위도 & 경도
    lat: number;
    lng: number;
  };
}

// 구글 맵 연동 컴포넌트
export default function Map({ center }: Props) {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerClassName="w-full h-full"
      ></GoogleMap>
    </LoadScript>
  );
}
