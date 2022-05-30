import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total_order: 0,
    total_price: 0,
    orders:[]
}

let eachOrderPrice = 0

const cartSlice = createSlice({
    name: 'Cart Slice',
    initialState,
    reducers:{
        ADD_TO_CART: (state, action) =>{
            const newOrder = action.payload
            console.log(newOrder)
            const existingOrder = state.orders.find(order => order.id === newOrder.id)

            if(existingOrder){
                existingOrder.eachQuantity++
                existingOrder.total_price+= action.payload.price
            }else{
                state.orders.push(newOrder)
                newOrder.total_price = newOrder.price * newOrder.eachQuantity
                state.total_order = state.orders.length
            }

            for(var i = 0; i < state.orders.length; i++){
                //console.log(state.orders.length[i])
                eachOrderPrice = eachOrderPrice + state.orders[i].total_price
            }
            state.total_price = eachOrderPrice
            eachOrderPrice = 0
        },
        REMOVE_FROM_CART(state, action){
            return state.orders.filter(order => order.id !== action.payload)
        },
    }
})

export const {ADD_TO_CART, REMOVE_FROM_CART} = cartSlice.actions

export default cartSlice