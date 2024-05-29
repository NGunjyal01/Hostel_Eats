import { createSlice } from "@reduxjs/toolkit";

const TabSlice = createSlice({
    name: "TabInfo",
    initialState:{
        prevTab: localStorage.getItem("prevTab")?JSON.parse(localStorage.getItem("prevTab")):-1,
        currTab: localStorage.getItem("currTab")?JSON.parse(localStorage.getItem("currTab")):0,
    },
    reducers:{
        setPrevTab: (state,action)=>{
            state.prevTab = action.payload;
        },
        setCurrTab: (state,action)=>{
            state.currTab = action.payload;
        }
    }
});

export const { setPrevTab,setCurrTab } = TabSlice.actions;
export default TabSlice.reducer;