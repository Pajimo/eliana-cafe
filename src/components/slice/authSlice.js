import { createSlice } from "@reduxjs/toolkit";

const initialState = 'login'

const authSlice = createSlice({
    name: 'Authenticaton',
    initialState,
    reducers:{
        checkAuthType(state, action){
            return state = action.payload
        },
    }
})

export const {checkAuthType} = authSlice.actions

export default authSlice