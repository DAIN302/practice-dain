import Map, { MapMarker, MapPath } from "@/components/plan/Map";
import { PlanState } from "@/store";
import { Place } from "@/types";

interface Props {
  plannedPlaces: PlanState["plannedPlaces"];
  accommodation: Place | null;
}

export default function ItineraryMapContainer({
  plannedPlaces,
  accommodation,
}: Props) {
  // 위도, 경도를 갖는 배열
  const markers = plannedPlaces.map(
    (plannedPlace) => plannedPlace.place.coordinates
  );

  return (
    <Map center={plannedPlaces[0].place.coordinates}>
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          coordinates={marker}
          options={{ color: "#0095A9" }}
          label={`${index + 1}`}
        />
      ))}
      {accommodation && (
        <MapMarker
          coordinates={accommodation.coordinates}
          options={{ color: "#C730DF" }}
          label="숙소"
        />
      )}
      <MapPath
        path={[
          ...markers,
          ...(accommodation ? [accommodation.coordinates] : []),
        ]}
        options={{ color: '#0095A9' }}
      />
    </Map>
  );
}
