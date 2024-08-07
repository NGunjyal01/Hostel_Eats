import { createSlice } from "@reduxjs/toolkit";

const canteen = localStorage.getItem('canteen');

const canteenSlice = createSlice({
    name: "canteen",
    initialState: {
        allCanteen: canteen ? (JSON.parse(canteen)).allCanteen ? (JSON.parse(canteen)).allCanteen :[]: [], 
        canteenDetails: canteen ? (JSON.parse(canteen).canteenDetails ? (JSON.parse(canteen).canteenDetails) : {}) : {},
    },
    reducers: {
        setAllCanteen: (state,action) =>{
            state.allCanteen = action.payload;
        },
        setCanteenDetails: (state,action) =>{
            state.canteenDetails = action.payload;
        }
    }
});

export const { setAllCanteen,setCanteenDetails } = canteenSlice.actions;
export default canteenSlice.reducer;