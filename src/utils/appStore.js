import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import tabReducer from "../slices/tabSlice";
import canteenReducer from "../slices/canteenSlice";
import canteenPageReducer from "../slices/canteenPageSlice"
import cartReducer from "../slices/cartSlice";
import favouritesReducer from '../slices/favouritesSlice';

const appStore = configureStore({
    reducer:{
        user: userReducer,
        tabInfo: tabReducer,
        canteen: canteenReducer,
        canteenPage: canteenPageReducer,
        cart: cartReducer,
        favourites: favouritesReducer,
    }
});

export default appStore;