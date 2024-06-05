import { createSlice } from "@reduxjs/toolkit";

const canteen = localStorage.getItem('canteen');

const canteenSlice = createSlice({
    name: "canteen",
    initialState: {
        allCanteen: canteen ? (JSON.parse(canteen)).allCanteen ? (JSON.parse(canteen)).allCanteen :null: null, 
    },
    reducers: {
        getAllCanteen: (state,action) =>{
            state.allCanteen = action.payload;
        },
    }
});

export const { getAllCanteen } = canteenSlice.actions;
export default canteenSlice.reducer;