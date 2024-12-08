import PlaceContainer from "./PlaceContainer";

export default function PlaceController() {
  return (
    <div className="h-full">
      {/* 헤더 */}
      <div className="p-14 border-b-3 border-b-main mb-18">
        <h4 className="text-main text-18 font-semibold">장소 선택</h4>
      </div>
      {/* 바디 */}
      <PlaceContainer />
    </div>
  );
}
