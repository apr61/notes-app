import { createAsyncThunk, createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { TagDataType, TagType } from "../../context/Tags"
import { addNewTag, deleteTagById, getAllTags, updateTagById } from "../../services/tags"
import { RootState } from "../../app/store"


interface TagsState {
	tags: TagType[],
	error: string | null,
	status: 'idle' | 'loading' | 'success' | 'failed',
	tagsModal: boolean
}

const initialState: TagsState = {
	tags: [],
	error: '',
	status: 'idle',
	tagsModal: false
}

export const fetchAllTags = createAsyncThunk('tags/fetchTags',
	async () => {
		try {
			const response = await getAllTags();
			return response as TagType[]
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(err.message)
			}
		}
	}
)

export const addTag = createAsyncThunk('tags/addNewTag',
	async (tagLabeL: TagDataType, { rejectWithValue }) => {
		try {
			const response = await addNewTag(tagLabeL)
			return response
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message)
			}
		}
	}
)

export const editTag = createAsyncThunk('tags/editTag',
	async (updatedTagData: TagType, { rejectWithValue }) => {
		try {
			const response = await updateTagById(updatedTagData)
			return response
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message)
			}
		}
	}
)

export const deleteTag = createAsyncThunk('tags/deleteTag',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await deleteTagById(id)
			return response
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message)
			}
		}
	}
)

export const tagsSlice = createSlice({
	name: "tags",
	initialState,
	reducers: {
		openTagsModal: (state) => {
			state.tagsModal = true
		},
		closeTagsModal: (state) => {
			state.tagsModal = false
		}
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAllTags.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAllTags.fulfilled, (state, action) => {
				state.status = 'success'
				state.tags = action.payload as TagType[]
			})
			.addCase(fetchAllTags.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message ?? 'Failed to fecth tags'
			})// Handling addTag, deleteTag and editTag - success
			.addCase(editTag.fulfilled, (state, action) => {
				state.status = 'success'
				const updateTag = action.payload as TagType
				state.tags = state.tags.map(tag => tag.id === updateTag.id ? updateTag : tag)
			})
			.addCase(addTag.fulfilled, (state, action) => {
				state.status = 'success'
				const newTag = action.payload as TagType
				state.tags.unshift(newTag)
			})
			.addCase(deleteTag.fulfilled, (state, action) => {
				state.status = 'success'
				state.tags = state.tags.filter(tag => tag.id !== action.payload)
			})
			.addMatcher(// Handling addTag, deleteTag and editTag - pending
				isAnyOf(addTag.pending, editTag.pending, deleteTag.pending),
				(state) => {
					state.status = 'loading'
					state.error = null
				}
			)
			.addMatcher(// Handling addTag, deleteTag and editTag - error
				isAnyOf(addTag.rejected, editTag.rejected, deleteTag.rejected),
				(state, action) => {
					state.status = 'failed'
					state.error = action.payload as string
				}
			)
	},
})

export const selectAllTags = (state: RootState) => state.tags.tags
export const getTagsStatus = (state: RootState) => state.tags.status
export const getTagsError = (state: RootState) => state.tags.error
export const getTagsModal = (state: RootState) => state.tags.tagsModal
export const getTagById = (id: string) => createSelector(
	(state: RootState) => state.tags.tags,
	(tags) => tags.find(tag => tag.id === id)
)

export const {openTagsModal, closeTagsModal} = tagsSlice.actions

export default tagsSlice.reducer