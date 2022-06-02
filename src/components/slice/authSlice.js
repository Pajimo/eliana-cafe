import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

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