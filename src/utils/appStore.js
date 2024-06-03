import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import tabReducer from "../slices/tabSlice";
import canteenReducer from "../slices/canteenSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        tabInfo: tabReducer,
        canteen: canteenReducer,
    }
});

export default appStore;