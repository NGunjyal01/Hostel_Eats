import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import tabReducer from "../slices/tabSlice";
import canteenReducer from "../slices/canteenSlice";
import canteenPageReducer from "../slices/canteenPageSlice"
import cartReducer from "../slices/cartSlice";
import favouritesReducer from '../slices/favouritesSlice';
import orderHistoryReducer from "../slices/orderHistorySlice";
import emailReducer from '../slices/emailSlice'
import popularDishesReducer from "../slices/popularDishesSlice";
import notificationReducer from "../slices/notificationSlice"
import paginationReducer from "../slices/paginationSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        tabInfo: tabReducer,
        canteen: canteenReducer,
        canteenPage: canteenPageReducer,
        cart: cartReducer,
        favourites: favouritesReducer,
        orderHistory: orderHistoryReducer,
        email: emailReducer,
        liveOrders: notificationReducer,
        popularDishes: popularDishesReducer,
        pagination: paginationReducer,
    }
});

export default appStore;