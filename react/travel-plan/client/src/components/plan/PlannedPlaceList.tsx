import { categories } from "@/constant";
import { Place } from "@/types";
import DeleteIcon from "@/assets/icons/delete.svg?react";
import { useState } from "react";
import { parseTime } from "@/utils/time";
import Button from "../common/Button";

interface Props {
  plannedPlaces: {
    place: Place;
    duration: number;
  }[];
  onDeletePlace: (index: number) => void;
  onEditDuration: (index: number, duration: number) => void;
}

export default function PlannedPlaceList({
  plannedPlaces,
  onDeletePlace,
  onEditDuration,
}: Props) {
  return (
    <div>
      {plannedPlaces.map((plannedplace, index) => (
        <PlannedPlace
          key={plannedplace.place.name}
          plannedplace={plannedplace}
          index={index}
          onDeletePlace={() => onDeletePlace(index)}
          onEditDuration={(duration: number) => onEditDuration(index, duration)}
        />
      ))}
    </div>
  );
}

function PlannedPlace({
  plannedplace,
  index,
  onDeletePlace,
  onEditDuration,
}: {
  plannedplace: { place: Place; duration: number };
  index: number;
  onDeletePlace: () => void;
  onEditDuration: (duration: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const { hours, minutes } = parseTime(plannedplace.duration);
  const [newHours, setNewHours] = useState(hours);
  const [newMinutes, setNewMinutes] = useState(minutes);

  return (
    <div className="flex items-center mb-20 h-68">
      {/* 번호 */}
      <span className="inline-block w-30 h-30 rounded-full bg-main text-16 text-white font-semibold tracking-[0.16px] leading-[30px] align-middle text-center mr-10">
        {index + 1}
      </span>
      <div className="w-[390px] border-1 border-gray200 rounded-10 flex px-12 py-10 items-center h-68">
        {!editing ? (
          <>
            {/* 썸네일 */}
            <img
              src={plannedplace.place.thumbnail}
              alt={plannedplace.place.name}
              className="h-48 w-48 shrink-0 rounded-6 mr-12"
            />
            {/* 정보 */}
            <div className="flex-1 mr-12 overflow-hidden">
              <h6 className="text-15 font-semibold tracking-[0.15px] mb-8">
                {plannedplace.place.name}
              </h6>
              <p className="text-14 tracking-[0.14px] text-gray500 overflow-hidden whitespace-nowrap text-ellipsis">
                <span className="text-main font-medium mr-5">
                  {categories[plannedplace.place.category]}
                </span>
                {plannedplace.place.address}
              </p>
            </div>
            {/* 시간 버튼 */}
            <Button variant="action" className="shrink-0" onClick={() => setEditing(true)}>
              {`${hours}시간 ${minutes}분`}
            </Button>
            {/* 삭제 버튼 */}
            <button onClick={onDeletePlace}>
              <DeleteIcon />
            </button>
          </>
        ) : (
          <>
            <span className="text-15 font-semibold tracking-[0.15px]">
              머무는 시간
            </span>
            <div className="flex-1 flex gap-x-12 justify-center items-center">
              <input
                type="number"
                value={newHours}
                max={12}
                min={0}
                onChange={(e) => setNewHours(Number(e.currentTarget.value))}
                className="text-20 font-semibold tracking-[0.2px] w-30 text-right"
              />
              <span className="text-15 font-medium tracking-[0.15px]">
                시간
              </span>
              <input
                type="number"
                value={newMinutes}
                max={60}
                min={0}
                onChange={(e) => setNewMinutes(Number(e.currentTarget.value))}
                className="text-20 font-semibold tracking-[0.2px] w-30 text-right"
              />
              <span className="text-15 font-medium tracking-[0.15px]">분</span>
            </div>
            <Button
              variant="action"
              onClick={() => {
                setEditing(false);
                onEditDuration(newHours * 60 + newMinutes);
              }}
            >
              완료
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
