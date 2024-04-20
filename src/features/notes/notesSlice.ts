import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NoteType } from "../../context/Notes";
import { getAllNotes } from "../../services/notes";
import { RootState } from "../../app/store";

interface NotesState {
  notes: NoteType[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

type FetchNotesArgs = {
  title: string;
  selectedTags: string[];
};

const initialState: NotesState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchAllNotes = createAsyncThunk(
  "note/fetchAllNotes",
  async (data: FetchNotesArgs, { rejectWithValue }) => {
    try {
      const response = await getAllNotes(data.title, data.selectedTags);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateNote: (state, action) => {
      const updatedNote: NoteType = action.payload;
      state.notes = state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    addNewNoteLocal: (state, action) => {
      state.notes.unshift(action.payload);
    },
    noteStatusChange: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.status = "success";
        state.notes = action.payload as NoteType[];
      })
      .addCase(fetchAllNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const getNotesStatus = (state: RootState) => state.notes.status;
export const getNotesError = (state: RootState) => state.notes.error;
export const selectAllNotes = (state: RootState) => state.notes.notes;

export const { updateNote, deleteNote, addNewNoteLocal, noteStatusChange } =
  notesSlice.actions;

export default notesSlice.reducer;
