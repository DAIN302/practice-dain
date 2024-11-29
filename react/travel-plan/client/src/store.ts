// zustand 로 상태관리
import { create } from "zustand";

interface State {
  startDate: Date | null;
  endDate: Date | null;
}

type Action = {
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
};

export const store = create<State & Action>()((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ startDate: date }),
}));
