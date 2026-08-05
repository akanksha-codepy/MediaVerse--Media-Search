import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMedia } from '../../api/mediaApi'

export const searchMedia = createAsyncThunk('search/searchMedia', async ({ query, type, page = 1, append = false }, { rejectWithValue }) => {
  try {
    const data = await getMedia({ query, type, page })
    return { ...data, type, query, append }
  } catch (error) {
    return rejectWithValue(error.response?.data?.errors?.[0] || error.message || 'Unable to load media right now.')
  }
})

const searchSlice = createSlice({
  name: 'search',
  initialState: { query: '', activeTab: 'photos', results: [], page: 1, hasMore: false, loading: false, loadingMore: false, error: null, recentSearches: JSON.parse(localStorage.getItem('mediaverse-recent-searches') || '[]') },
  reducers: {
    setQuery: (state, action) => { state.query = action.payload },
    setActiveTab: (state, action) => { state.activeTab = action.payload; state.results = []; state.page = 1; state.error = null },
    addRecentSearch: (state, action) => {
      const value = action.payload.trim()
      if (!value) return
      state.recentSearches = [value, ...state.recentSearches.filter((item) => item.toLowerCase() !== value.toLowerCase())].slice(0, 6)
      localStorage.setItem('mediaverse-recent-searches', JSON.stringify(state.recentSearches))
    },
    clearRecentSearches: (state) => { state.recentSearches = []; localStorage.removeItem('mediaverse-recent-searches') },
    clearResults: (state) => { state.results = []; state.error = null },
  },
  extraReducers: (builder) => builder
    .addCase(searchMedia.pending, (state, action) => { action.meta.arg.append ? state.loadingMore = true : state.loading = true; state.error = null })
    .addCase(searchMedia.fulfilled, (state, action) => {
      const { items, page, hasMore, append } = action.payload
      state.results = append ? [...state.results, ...items] : items
      state.page = page; state.hasMore = hasMore; state.loading = false; state.loadingMore = false
    })
    .addCase(searchMedia.rejected, (state, action) => { state.loading = false; state.loadingMore = false; state.error = action.payload }),
})

export const { setQuery, setActiveTab, addRecentSearch, clearRecentSearches, clearResults } = searchSlice.actions
export const selectSearch = (state) => state.search
export default searchSlice.reducer
