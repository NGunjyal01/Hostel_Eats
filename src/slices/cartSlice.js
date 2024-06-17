import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null,
    reducers: {
        setCartItem: (action)=>{
            return action.payload;
        },
        removeCartItems: ()=>{
            return null;
        }
    }
});

export const { setCartItem,removeCartItems } = cartSlice.actions;
export default cartSlice.reducer;