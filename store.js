// import {createStore} from 'redux'

// const reducers = (state = {name: 'Olamide', number: 0}, action) => {
//     if(action.type === 'New'){ 
//         return {name: action.payload}
//     }
//     switch (action.type){
//         case 'surname':
//             return {...state, lastName: action.payload}
//         case 'number':
//             return {...state, number: state.number + 1}
//     }
//     return state
// }

// export const store = createStore(reducers)

import { configureStore, createSlice } from "@reduxjs/toolkit";

const usersInfoSlice = createSlice({
    name: 'UsersInfo',
    initialState : {name: 'Olamide', number: 0, lastName: ''},
    reducers: {
        AddSurname(state, action) {
            state.lastName = action.payload
        },
        IncreaseNumber(state, action){
            state.number += action.payload
        }
    }
})

export const {AddSurname, IncreaseNumber} = usersInfoSlice.actions
export const store = configureStore({
    reducer: usersInfoSlice.reducer
}) 