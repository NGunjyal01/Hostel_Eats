import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    canteensData: [],
    selectedCanteen: null,
};

const canteenPageSlice = createSlice({
    name: 'canteenPage',
    initialState,
    reducers: {
        setCanteensData(state, action) {
            state.canteensData = action.payload;
        },
        setCanteenDetails(state, action) {
            state.selectedCanteen = action.payload;
        },
        clearCanteenData(state) {
            state.canteensData = [];
            state.selectedCanteen = null;
        }
    }
});

export const { setCanteensData, setCanteenDetails, clearCanteenData } = canteenPageSlice.actions;
export default canteenPageSlice.reducer;
