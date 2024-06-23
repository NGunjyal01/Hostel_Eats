import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null,
    reducers: {
        setCartItem: (state,action) => {
            return action.payload;
        },
        resetCartItems: (state,action) => {
            return null;
        }
    }
});

export const { setCartItem, resetCartItems } = cartSlice.actions;
export default cartSlice.reducer;
