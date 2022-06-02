import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
    isActive: false
}

const viewProductSlice = createSlice({
    name: 'View Product',
    initialState,
    reducers:{
        ViewProduct(state, action){
            state.product[0] = action.payload.order
            state.isActive = action.payload.isActive
        }
    }
})

export const {ViewProduct} = viewProductSlice.actions;
export default viewProductSlice;