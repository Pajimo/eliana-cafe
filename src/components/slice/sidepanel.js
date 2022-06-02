import { createSlice } from "@reduxjs/toolkit";


const SidePanelSlice = createSlice({
    name: 'Side Panel',
    initialState: false,
    reducers:{
        ToggleSidepanel(state, action){
            return state = action.payload
        }
    }
})

export const {ToggleSidepanel} = SidePanelSlice.actions;

export default SidePanelSlice