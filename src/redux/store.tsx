import { configureStore } from "@reduxjs/toolkit";
import sampleReducer from "./slices/sampleSlice.tsx"


const store = configureStore({
    reducer:{
      sample:sampleReducer
    }
})


export default store;