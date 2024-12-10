import Map, { MapMarker, MapPath } from '@/components/plan/Map';
import { usePlanStore } from '@/store';

interface Props {
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function PlanMapContainer({ coordinates }: Props) {
  const { plannedPlaces } = usePlanStore();

  // 위도, 경도를 갖는 배열
  const markers = plannedPlaces.map(
    plannedPlace => plannedPlace.place.coordinates,
  );

  return (
    <Map center={coordinates}>
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          coordinates={marker}
          options={{ color: '#0095A9' }}
          label={`${index + 1}`}
        />
      ))}
      <MapPath path={markers} options={{ color: '#0095A9' }} />
    </Map>
  );
}
