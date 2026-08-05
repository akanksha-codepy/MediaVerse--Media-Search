import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'
import collectionsReducer from './features/collectionSlice'
export default configureStore({ reducer: { search: searchReducer, collections: collectionsReducer } })
