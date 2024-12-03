// zustand 로 상태관리
import { addDays, differenceInDays } from "date-fns";
import { FunctionComponent } from "react";
import { create } from "zustand";

// 날짜 지정 state
interface State {
  startDate: Date | null;
  endDate: Date | null;
  status: "period_editing" | "planning";
  dailyTimes: { startTime: string; endTime: string; date: Date }[];
}

type Action = {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setStatus: (status: State["status"]) => void;
  setDailyTime: (
    index: number,
    time: string,
    type: "startTime" | "endTime"
  ) => void;
};

export const usePlanStore = create<State & Action>()((set, get) => ({
  startDate: null,
  endDate: null,
  status: "period_editing",
  dailyTimes: [],
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => {
    if (date) {
      const startDate = get().startDate!; // getter 함수로 가져올 수 있음
      const diff = differenceInDays(date, startDate) + 1; // 얼마의 기간이 남았는지 계산(총 날짜 계산)
      const dailyTimes = Array.from({ length: diff }, (_, i) => {
        return {
          startTime: "10:00",
          endTime: "22:00",
          date: addDays(startDate, i),
        };
      });
      set({ dailyTimes, endDate: date });
      // date 가 어떤 값이 들어오더라도 같은 output 을 낸다.
    } else {
      // date 가 없으면 초기화
      set({ endDate: date, dailyTimes: [] });
    }
  },
  setStatus: (status) => set({ status }),
  setDailyTime: (index, time, type) => {
    set((state) => ({
      dailyTimes: state.dailyTimes.map((dailyTime, i) =>
        i === index ? { ...dailyTime, [type]: time } : dailyTime
      ),
    }));
  },
}));

// 모달 state
interface ModalState {
  modals: FunctionComponent<{ onClose: () => void }>[];
}

type ModalAction = {
  openModal: (modal: FunctionComponent<{ onClose: () => void }>) => void;
  closeModal: (index: number) => void;
};

export const useModalStore = create<ModalState & ModalAction>()((set) => ({
  modals: [],
  openModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  closeModal: (index) =>
    set((state) => ({ modals: state.modals.filter((_, i) => i !== index) })),
}));
