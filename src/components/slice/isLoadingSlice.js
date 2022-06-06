import { createSlice } from "@reduxjs/toolkit";

const initialState = true

const LoadingSlice = createSlice({
    name: 'Loading State',
    initialState,
    reducers: {
        IsLoading(state, action){
            return state = action.payload
        }
    }
})

export const {IsLoading} = LoadingSlice.actions;

export default LoadingSlice