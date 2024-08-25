import villagersRuducer from "./villagersSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer : {
        villager  : villagersRuducer
    }
})

export default store;