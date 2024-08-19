import {createSlice} from "@reduxjs/toolkit";
import villagers from "../data/villagersData";

const villagerSlice = createSlice({
    name : 'villager',
    initialState : {info : villagers[0]},
    reducers : {
        chgIndex : (state, action) => { state.info = villagers[action.payload] }
    }
})

export const { chgIndex } = villagerSlice.actions;

export default villagerSlice.reducer;