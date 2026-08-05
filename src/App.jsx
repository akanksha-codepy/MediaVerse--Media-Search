import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'
import CollectionPage from './pages/CollectionPage'

function SearchPage() {
  return <main className="app-shell"><div className="search-area"><SearchBar /><Tabs /></div><section className="results-section"><ResultGrid /></section></main>
}

export default function App() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 500); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <><NavBar /><Routes><Route path="/" element={<SearchPage />} /><Route path="/favorites" element={<CollectionPage />} /></Routes>{showTop && <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>}</>
}
