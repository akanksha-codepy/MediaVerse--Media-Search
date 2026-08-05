import { createSlice } from '@reduxjs/toolkit'

const saved = JSON.parse(localStorage.getItem('mediaverse-favorites') || '[]')
const viewed = JSON.parse(localStorage.getItem('mediaverse-recently-viewed') || '[]')
const collectionSlice = createSlice({
  name: 'collections',
  initialState: { favorites: saved, recentlyViewed: viewed, collections: JSON.parse(localStorage.getItem('mediaverse-collections') || '[{"id":"inspiration","name":"Inspiration","items":[]}]') },
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload; const exists = state.favorites.some((favorite) => favorite.id === item.id && favorite.type === item.type)
      state.favorites = exists ? state.favorites.filter((favorite) => !(favorite.id === item.id && favorite.type === item.type)) : [item, ...state.favorites]
      localStorage.setItem('mediaverse-favorites', JSON.stringify(state.favorites))
    },
    saveToCollection: (state, action) => { state.collections[0].items = [action.payload, ...state.collections[0].items.filter((item) => item.id !== action.payload.id)]; localStorage.setItem('mediaverse-collections', JSON.stringify(state.collections)) },
    addRecentlyViewed: (state, action) => { const item = action.payload; state.recentlyViewed = [item, ...state.recentlyViewed.filter((entry) => !(entry.id === item.id && entry.type === item.type))].slice(0, 18); localStorage.setItem('mediaverse-recently-viewed', JSON.stringify(state.recentlyViewed)) },
  },
})
export const { toggleFavorite, saveToCollection, addRecentlyViewed } = collectionSlice.actions
export const selectFavorites = (state) => state.collections.favorites
export const selectRecentlyViewed = (state) => state.collections.recentlyViewed
export default collectionSlice.reducer
