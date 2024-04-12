import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { TagType } from "../../context/Tags"
import { getAllTags } from "../../services/tags"
import { RootState } from "../../app/store"


interface TagsState {
    tags: TagType[],
    error: string | null,
    status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: TagsState = {
    tags: [],
    error: '',
    status: 'idle'
}

export const fetchAllTags = createAsyncThunk('tags/fetchTags', async (): Promise<TagType[]> => {
    const response = await getAllTags();
    return response as TagType[]
})

export const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        deleteTag: (state, action) => {
            state.tags = state.tags.filter(tag => tag.id !== action.payload)
        },
        editTag: (state, action) => {
            state.tags = state.tags.map(tag => {
                if(tag.id === action.payload.id){
                    return action.payload
                }else{
                    return tag
                }
            })
        },
        addTag: (state, action) => {
            state.tags.push({id: nanoid(), tag: action.payload.tag})
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAllTags.pending, (state) => {
            state.status = 'loading'
        }).addCase(fetchAllTags.fulfilled, (state, action) => {
            state.status = 'success'
            state.tags = action.payload
        }).addCase(fetchAllTags.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message ?? 'Failed to fecth tags'
        })
    },
})

export const selectAllTags = (state: RootState) => state.tags.tags
export const getTagsStatus = (state: RootState) => state.tags.status
export const getTagsError = (state: RootState) => state.tags.error
export const getTagById = (state: RootState, id: string) => state.tags.tags.find(tag => tag.id === id)

export const { addTag, deleteTag, editTag} = tagsSlice.actions

export default tagsSlice.reducer