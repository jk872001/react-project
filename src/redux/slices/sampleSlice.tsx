import { createSlice } from "@reduxjs/toolkit";


const sampleSlice = createSlice({
    name: "sample",
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state,action)=>{
             state.items.push(action.payload)
        },
        removeItem:(state)=>{
             state.items.pop()
        },
        clearItem:(state)=>{
             state.items.length = 0;
        },
    }
})

export const {addItem,removeItem,clearItem} = sampleSlice.actions

export default sampleSlice.reducer