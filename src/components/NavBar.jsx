import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavorites } from '../redux/features/collectionSlice'
import { clearResults, setActiveTab, setQuery } from '../redux/features/searchSlice'

export default function NavBar() {
  const dispatch = useDispatch(); const favorites = useSelector(selectFavorites); const location = useLocation()
  const goHome = () => { dispatch(setQuery('')); dispatch(clearResults()); dispatch(setActiveTab('photos')); window.dispatchEvent(new Event('mediaverse:reset-search')); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <header className="nav"><Link className="brand" to="/" onClick={goHome} aria-label="MediaVerse home"><span className="brand-mark" />MediaVerse</Link><nav><Link className={location.pathname === '/' ? 'current' : ''} to="/" onClick={goHome}>Explore</Link><Link className={location.pathname === '/favorites' ? 'current' : ''} to="/favorites">Saved{favorites.length > 0 && <b>{favorites.length}</b>}</Link></nav></header>
}
