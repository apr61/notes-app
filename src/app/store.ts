import { configureStore } from "@reduxjs/toolkit";
import tagsSlice from "../features/tags/tagsSlice";
import notesSlice from "../features/notes/notesSlice";


export const store = configureStore({
    reducer: {
        tags: tagsSlice,
        notes: notesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch