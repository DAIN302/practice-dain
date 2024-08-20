import { configureStore } from "@reduxjs/toolkit";
import stdValueReducer from './stdValueSlice';

const store = configureStore({
    reducer : {
        stdValue : stdValueReducer
    }
})

export default store;