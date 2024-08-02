import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'liveOrders',
    initialState: [],
    reducers: {
        setLiveOrders: (state,action)=>{
            return action.payload;
        },
        addLiveOrder: (state,action)=>{
            return [action.payload,...state];
        },
    }
});

export const { setLiveOrders,addLiveOrder } = notificationSlice.actions;
export default notificationSlice.reducer;