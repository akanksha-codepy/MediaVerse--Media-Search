import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRecentSearch, selectSearch, setQuery } from '../redux/features/searchSlice'

const suggestions = ['Abstract architecture', 'Ocean waves', 'Neon city', 'Golden retriever']
export default function SearchBar() {
  const dispatch = useDispatch(); const { query, recentSearches } = useSelector(selectSearch); const [value, setValue] = useState(query); const [focused, setFocused] = useState(false)
  useEffect(() => { const reset = () => { setValue(''); setFocused(false) }; window.addEventListener('mediaverse:reset-search', reset); return () => window.removeEventListener('mediaverse:reset-search', reset) }, [])
  useEffect(() => { if (!value.trim() || value === query) return; const timer = window.setTimeout(() => dispatch(setQuery(value.trim())), 420); return () => window.clearTimeout(timer) }, [dispatch, query, value])
  useEffect(() => { const keydown = (event) => { if ((event.metaKey || event.ctrlKey) && event.key === 'k') { event.preventDefault(); document.getElementById('media-search')?.focus() } }; window.addEventListener('keydown', keydown); return () => window.removeEventListener('keydown', keydown) }, [])
  const submit = (term = value) => { const clean = term.trim(); if (!clean) return; dispatch(setQuery(clean)); dispatch(addRecentSearch(clean)); setFocused(false) }
  const visibleSuggestions = value ? suggestions.filter((item) => item.toLowerCase().includes(value.toLowerCase())) : (recentSearches.length ? recentSearches : suggestions)
  return <div className="search-wrap"><motion.form initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onSubmit={(event) => { event.preventDefault(); submit() }} className="search-bar"><input id="media-search" value={value} onFocus={() => setFocused(true)} onChange={(event) => setValue(event.target.value)} placeholder="Search photography, video, and motion" autoComplete="off" /><button type="submit">Search</button></motion.form>{focused && <div className="suggestion-panel"><p>Suggested searches</p>{visibleSuggestions.slice(0, 4).map((item) => <button key={item} onMouseDown={(event) => { event.preventDefault(); submit(item) }}>{item}</button>)}</div>}</div>
}
