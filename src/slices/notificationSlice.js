import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'liveOrders',
    initialState: [],
    reducers: {
        setLiveOrders: (state,action)=>{
            return action.payload;
        }
    }
});

export const { setLiveOrders } = notificationSlice.actions;
export default notificationSlice.reducer;