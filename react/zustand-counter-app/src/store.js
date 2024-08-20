import create from 'zustand'

export const useCounterStore = create((set) => ({
    count : 1,
    // set을 이용해서 state 변경
    increament : () => set((state) => ({count :  state.count + 1})),
    decreament : () => set((state) => ({count :  state.count - 1})),
    reset : () => set({count : 1}),
    setNumber : (number) => set({count : number})
}))