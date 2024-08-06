import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {},
    reducers: {
        setCartItem: (state,action) => {
            return action.payload;
        },
        resetCartItems: () => {
            return {};
        }
    }
});

export const { setCartItem, resetCartItems } = cartSlice.actions;
export default cartSlice.reducer;
