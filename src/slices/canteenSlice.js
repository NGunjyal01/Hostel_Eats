import { createSlice } from "@reduxjs/toolkit";

const canteenSlice = createSlice({
    name: "canteen",
    initialState: {
        allCanteen: localStorage.getItem('canteen') ? (localStorage.getItem('canteen').allCanteen ? JSON.parse(localStorage.getItem('canteen').allCanteen) : null) : null 
    },
    reducers: {
        getAllCanteen: (state,action) =>{
            state.allCanteen = action.payload;
        },
    }
});

export const { getAllCanteen } = canteenSlice.actions;
export default canteenSlice.reducer;