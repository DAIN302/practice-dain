import { createSlice } from '@reduxjs/toolkit'

// 평균을 구하는 함수
const calculateAverage = (arr) => arr.reduce((acc, num) => acc + num, 0) / arr.length;

// 표본 표준편차를 구하는 함수
const calculateSampleStandardDeviation = (arr) => {
    const avg = calculateAverage(arr);
    const variance = arr.reduce((acc, num) => acc + Math.pow(num - avg, 2), 0) / (arr.length - 1);
    return Math.sqrt(variance);
};

const stdValueSlice = createSlice({
    name : 'standard',
    initialState : {stdArr : [0,0,0,0,0,0], stdAvg : 0, stdSD : 0, stdRSD : 0},
    reducers : {
        peakArr : (state, action) => {state.stdArr = action.payload},
        stdAvg : (state, action) => {
            state.stdAvg = Math.round(calculateAverage(state.stdArr))
        },
        stdSD : (state, action) => {
            state.stdSD = Math.round(calculateSampleStandardDeviation(state.stdArr) * 100) / 100
            
        },
        stdRSD : (state, action) => {
            state.stdRSD = Math.round(((state.stdSD / state.stdAvg)*100)*100) / 100
        }
    }
})

export const { peakArr, stdAvg, stdSD, stdRSD } = stdValueSlice.actions;

export default stdValueSlice.reducer;

