import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import authSlice from "../slice/authSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        cart: cartSlice.reducer
    }
})
