import { usePlanStore } from "@/store";
import Button from "../common/Button";
import Modal, { ModalBackdrop, ModalPanel } from "../common/Modal";
import TravelDateSelector from "./TravelDateSelector";

export default function TravelPeriodModal() {
  const { startDate, endDate, setStartDate, setEndDate, setStatus } =
    usePlanStore();

  // 날짜 변경 함수
  const handleChangeDates = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  // 선택 변경 버튼 함수
  const handleComplete = () => {
    setStatus("planning");
  };

  return (
    <Modal>
      <ModalBackdrop />
      <ModalPanel className="text-center">
        <h2 className="text-32 font-semibold mb-18">
          여행 기간이 어떻게 되시나요?
        </h2>
        <p className="text-15 leading-[1.5] mb-30">
          * 여행 일자는 최대 10일까지 설정 가능합니다. <br />
          현지 여행 기간(여행지 도착 날짜, 여행지 출발 날짜)으로 입력해 주세요.
        </p>
        <div className="mb-30">
          <TravelDateSelector
            startDate={startDate}
            endDate={endDate}
            onChange={handleChangeDates}
          />
        </div>
        <div className="text-right">
          <Button
            className="px-42"
            onClick={handleComplete}
            disabled={!startDate || !endDate}
          >
            선택
          </Button>
        </div>
      </ModalPanel>
    </Modal>
  );
}
