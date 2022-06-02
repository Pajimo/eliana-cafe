import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import authSlice from "../slice/authSlice";
import SidePanelSlice from "../slice/sidepanel";
import viewProductSlice from "../slice/viewProduct";

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
        sidepanel: SidePanelSlice.reducer,
        viewProduct: viewProductSlice.reducer
    }
})
