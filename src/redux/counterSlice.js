import { createSlice } from "@reduxjs/toolkit";

let counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {count: 0 , userName: 'Ahmad Ramadan'},
    reducers: { // methods will be used to mutate the state
        increaseCount: (state) => {
            state.count++;
        },
        decreaseCount: (state) => {
            state.count--;
        },
        increaseByAmount: (state , action) => {
            state.count += action.payload;
        }
    }
})


export let counterReducer = counterSlice.reducer;
export let {increaseCount, decreaseCount, increaseByAmount} = counterSlice.actions; // export the actions to be used in the components