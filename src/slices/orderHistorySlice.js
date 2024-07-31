import { createSlice } from "@reduxjs/toolkit";

const orderHistory = createSlice({
    name: 'orderHistory',
    initialState: localStorage.getItem('orderHistory') ? JSON.parse(localStorage.getItem('orderHistory')) : [],
    reducers:{
        setOrderHistory : (state,action)=>{
            return action.payload;
        },
        addOrder: (state,action)=>{
            return [action.payload,...state];
        },
        setOrderStatus: (state,action)=>{
            return state.map((order) => order._id===action.payload.orderid ? {...order,status:action.payload.status}: order);
        }
    },
});

export const { setOrderHistory,addOrder,setOrderStatus } = orderHistory.actions;

export default orderHistory.reducer;