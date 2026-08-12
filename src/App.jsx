import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'
import CollectionPage from './pages/CollectionPage'

function SearchPage() {
  return <main className="app-shell">
    <section className="hero">
      <p className="eyebrow">CURATED VISUAL DISCOVERY</p>
      <h1>Find visuals that<br /><em>move ideas forward.</em></h1>
      <p className="hero-copy">A focused workspace for discovering striking photography, video, and motion—without the usual noise.</p>
      <SearchBar />
      <Tabs />
    </section>
    <section className="results-section">
      <div className="section-heading"><div><p>EXPLORE THE LIBRARY</p><h2>Fresh visual inspiration</h2></div><span>Click any visual to preview</span></div>
      <ResultGrid />
    </section>
  </main>
}

export default function App() {
  const [showTop, setShowTop] = useState(false)
  useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 500); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll) }, [])
  return <><NavBar /><Routes><Route path="/" element={<SearchPage />} /><Route path="/favorites" element={<CollectionPage />} /></Routes>{showTop && <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">Top</button>}</>
}
