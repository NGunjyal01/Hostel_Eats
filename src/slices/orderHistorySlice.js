import { createSlice } from "@reduxjs/toolkit";

const orderHistory = createSlice({
    name: 'orderHistory',
    initialState:{
        customer: null,
        owner: null,
    },
    reducers:{
        setCustomerOrderHistory: (state,action)=>{
            state.customer = action.payload;
        },
        setOwnerOrderHistory: (state,action)=>{
            state.owner = action.payload;
        },
    },
});

export const { setCustomerOrderHistory, setOwnerOrderHistory } = orderHistory.actions;

export default orderHistory.reducer;