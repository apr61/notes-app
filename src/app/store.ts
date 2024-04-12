import { configureStore } from "@reduxjs/toolkit";
import tagsSlice from "../features/tags/tagsSlice";


export const store = configureStore({
    reducer: {
        tags: tagsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch