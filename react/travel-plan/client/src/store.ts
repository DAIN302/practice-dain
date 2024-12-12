// zustand 로 상태관리
import { addDays, differenceInDays } from "date-fns";
import { FunctionComponent } from "react";
import { create } from "zustand";
import { Place } from "./types";

// 계획 state
export interface PlanState {
  startDate: Date | null;
  endDate: Date | null;
  status: "period_edit" | "planning";
  dailyTimes: { startTime: string; endTime: string; date: Date }[];
  plannedPlaces: {
    place: Place;
    duration: number; // minutes
  }[];
  plannedAccommodations: Array<Place | null>;
}

type Action = {
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setStatus: (status: PlanState["status"]) => void;
  setDailyTime: (
    index: number,
    time: string,
    type: "startTime" | "endTime"
  ) => void;
  addPlannedPlace: (place: Place, duration: number) => void;
  removePlannedPlace: (index: number) => void;
  setDurationForPlannedPlace: (index: number, duration: number) => void;
  addPlannedAccommodation: (place: Place) => void;
  removePlannedAccommodation: (index: number) => void;
};

export const usePlanStore = create<PlanState & Action>()((set, get) => ({
  // state
  startDate: null,
  endDate: null,
  status: "period_edit",
  dailyTimes: [],
  plannedPlaces: [],
  plannedAccommodations: [],
  // action
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
      set({
        dailyTimes,
        endDate: date,
        plannedAccommodations: Array.from({ length: diff - 1 }, () => null),
      });
      // date 가 어떤 값이 들어오더라도 같은 output 을 낸다.
    } else {
      // date 가 없으면 초기화
      set({ endDate: date, dailyTimes: [], plannedAccommodations: [] });
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
  addPlannedPlace: (place: Place, duration: number) =>
    set((prev) => ({
      plannedPlaces: [...prev.plannedPlaces, { place, duration }],
    })),
  removePlannedPlace: (index: number) =>
    set((prev) => ({
      plannedPlaces: prev.plannedPlaces.filter((_, i) => i !== index),
    })),
  setDurationForPlannedPlace: (index: number, duration: number) =>
    set((prev) => ({
      plannedPlaces: prev.plannedPlaces.map((place, i) =>
        i === index ? { ...place, duration } : place
      ),
    })),
  addPlannedAccommodation: (place: Place) =>
    set((prev) => {
      const index = prev.plannedAccommodations.findIndex((p) => p === null); // 현재 저장된 데이터가 null 인 첫번째 인덱스 저장
      if (index === -1) {
        // null 인 data 를 찾지 못할 경우
        return prev; // 기존 state 와 동일한 state 리턴 -> 장소 리스트에 숙소 추가 X
      }
      return {
        // i===index 면 새로 등록된 place 등록 아니라면 기존과 동일한 아이템 지정
        plannedAccommodations: prev.plannedAccommodations.map((p, i) =>
          i === index ? place : p
        ),
      };
    }),
  removePlannedAccommodation: (index: number) =>
    set((prev) => ({
      plannedAccommodations: prev.plannedAccommodations.map((p, i) =>
        i === index ? null : p
      ),
    })),
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
  // state
  modals: [],
  // action
  openModal: (modal) => set((state) => ({ modals: [...state.modals, modal] })),
  closeModal: (index) =>
    set((state) => ({ modals: state.modals.filter((_, i) => i !== index) })),
}));
