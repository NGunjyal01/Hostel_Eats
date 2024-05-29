import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import tabReducer from "../slices/tabSlice";

const appStore = configureStore({
    reducer:{
        user:userReducer,
        tabInfo:tabReducer
    }
});

export default appStore;