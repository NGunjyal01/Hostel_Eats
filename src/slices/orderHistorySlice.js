import { createSlice } from "@reduxjs/toolkit";

const orderHistory = createSlice({
    name: 'orderHistory',
    initialState: localStorage.getItem('orderHistory') ? JSON.parse(localStorage.getItem('orderHistory')) : [],
    reducers:{
        setOrderHistory : (state,action)=>{
            return action.payload;
        }
    },
});

export const { setOrderHistory } = orderHistory.actions;

export default orderHistory.reducer;