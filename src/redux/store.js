import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import productReducer from './productsSlice.js'
export let store = configureStore({
    reducer: {
        // waiting for reducers 
        counterReducer,
        productReducer
    }
});