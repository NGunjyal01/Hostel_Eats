import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {},
    reducers: {
        setCartItem: (state, action) => {
            const { itemid, quantity } = action.payload;

            if (quantity > 0) {
                state[itemid] = quantity;
            } else {
                delete state[itemid];
            }

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeCartItems: (state) => {
            localStorage.removeItem('cart');
            return {};
        }
    }
});

export const { setCartItem, removeCartItems } = cartSlice.actions;
export default cartSlice.reducer;
