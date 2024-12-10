import { categories } from "@/constant";
import { Place } from "@/types";
import DeleteIcon from "@/assets/icons/delete.svg?react";

interface Props {
  plannedPlaces: {
    place: Place;
    duration: number;
  }[];
}

export default function PlannedPlaceList({ plannedPlaces }: Props) {
  return (
    <div>
      {plannedPlaces.map((plannedplace, index) => (
        <div className="flex items-center mb-20" key={plannedplace.place.name}>
          {/* 번호 */}
          <span className="inline-block w-30 h-30 rounded-full bg-main text-16 text-white font-semibold tracking-[0.16px] leading-[30px] align-middle text-center mr-10">
            {index + 1}
          </span>
          <div className="w-[390px] border-1 border-gray200 rounded-10 flex px-12 py-10 items-center">
            {/* 썸네일 */}
            <img
              src={plannedplace.place.thumbnail}
              alt={plannedplace.place.name}
              className="h-48 w-48 shrink-0 rounded-6 mr-12"
            />
            {/* 정보 */}
            <div className="flex-1 mr-12">
              <h6 className="text-15 font-semibold tracking-[0.15px] mb-8">
                {plannedplace.place.name}
              </h6>
              <p className="text-14 tracking-[0.14px] text-gray500">
                <span className="text-main font-medium mr-5">
                  {categories[plannedplace.place.category]}
                </span>
                {plannedplace.place.address}
              </p>
            </div>
            {/* 시간 버튼 */}
            <button className="py-6 px-8 rounded-10 bg-main/10 text-main text-14 font-medium mr-5">
              {plannedplace.duration}분
            </button>
            {/* 삭제 버튼 */}
            <button>
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
