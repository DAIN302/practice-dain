// zustand 로 상태관리
import { FunctionComponent } from "react";
import { create } from "zustand";

// 날짜 지정 state
interface State {
  startDate: Date | null;
  endDate: Date | null;
  status: "period_editing" | "planning";
}

type Action = {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setStatus: (status: State["status"]) => void;
};

export const usePlanStore = create<State & Action>()((set) => ({
  startDate: null,
  endDate: null,
  status: "period_editing",
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ startDate: date }),
  setStatus: (status) => set({ status }),
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
