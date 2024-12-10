import { categories } from "@/constant";
import { Place } from "@/types";
import DeleteIcon from "@/assets/icons/delete.svg?react";

export default function PlaceController() {
  return (
    <div className="flex flex-col text-left">
      <h5 className="flex items-end mb-13">
        <span className="text-30 font-medium tracking=[0.3px]">0</span>
        <span className="text-15 tracking-[0.15px] mb-4">
          1시간 0분 / 36시간 0분
        </span>
      </h5>
      {/* 컨테이너 리스트 */}
      <div>
        {DUMMY_PLACES.map((plannedplace, index) => (
          <div className="flex items-center mb-20" key={index}>
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
    </div>
  );
}

function EmptyList() {
  return (
    <div className="w-[430px] h-89 rounded-10 bg-bg">
      <p className="mt-70 mx-auto text-14 text-gray500">장소를 선택해 주세요</p>
    </div>
  );
}

const DUMMY_PLACES = [
  {
    place: {
      name: "경복궁",
      address: "서울시 종로구 사직로 161",
      category: "attraction",
      thumbnail: "https://picsum.photos/seed/place/200/300?random=3",
    } as unknown as Place,
    duration: 60,
  },
  {
    place: {
      name: "경복궁",
      address: "서울시 종로구 사직로 161",
      category: "attraction",
      thumbnail: "https://picsum.photos/seed/place/200/300?random=3",
    } as unknown as Place,
    duration: 60,
  },
  {
    place: {
      name: "경복궁",
      address: "서울시 종로구 사직로 161",
      category: "attraction",
      thumbnail: "https://picsum.photos/seed/place/200/300?random=3",
    } as unknown as Place,
    duration: 60,
  },
  {
    place: {
      name: "경복궁",
      address: "서울시 종로구 사직로 161",
      category: "attraction",
      thumbnail: "https://picsum.photos/seed/place/200/300?random=3",
    } as unknown as Place,
    duration: 60,
  },
  {
    place: {
      name: "경복궁",
      address: "서울시 종로구 사직로 161",
      category: "attraction",
      thumbnail: "https://picsum.photos/seed/place/200/300?random=3",
    } as unknown as Place,
    duration: 60,
  },
  {
    place: {
      name: "경복궁",
      address: "서울시 종로구 사직로 161",
      category: "attraction",
      thumbnail: "https://picsum.photos/seed/place/200/300?random=3",
    } as unknown as Place,
    duration: 60,
  },
];
