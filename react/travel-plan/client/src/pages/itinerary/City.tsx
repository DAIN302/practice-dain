import Loading from "@/components/common/Loading";
import WideLayout from "@/components/common/WideLayout";
import ItineraryController from "@/components/itinerary/ItineraryController";
import useGenerateItinerary from "@/hooks/itinerary/useGenerateItinerary";
import { usePlanStore } from "@/store";
import { ItineraryItem } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ItineraryCity() {
  const { generateItinerary } = useGenerateItinerary();

  const { plannedPlaces, dailyTimes } = usePlanStore();
  const navigate = useNavigate();
  const { city } = useParams();

  const [itinerary, setItinerary] = useState<
    ItineraryItem[][] | null
  >(null);

  useEffect(() => {
    if (plannedPlaces.length === 0 || dailyTimes.length === 0) {
      navigate(`/plan/${city}`);
      return;
    }
    generateItinerary(plannedPlaces, dailyTimes).then((itineraray) => {
      setItinerary(itineraray);
    });
  }, [city, dailyTimes, generateItinerary, plannedPlaces]);

  return (
    <WideLayout>
      {!itinerary ? (
        <Loading />
      ) : (
        <div className="flex h-full">
          {/* 컨트롤러 */}
          <ItineraryController itinerary={itinerary} />  
        </div>
      )}
    </WideLayout>
  );
}
