import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFavorites } from '../redux/features/collectionSlice'

export default function NavBar() {
  const favorites = useSelector(selectFavorites); const location = useLocation()
  return <header className="nav"><Link className="brand" to="/"><span>◈</span> MediaVerse</Link><nav><Link className={location.pathname === '/' ? 'current' : ''} to="/">Explore</Link><Link className={location.pathname === '/favorites' ? 'current' : ''} to="/favorites">Favorites{favorites.length > 0 && <b>{favorites.length}</b>}</Link></nav></header>
}
