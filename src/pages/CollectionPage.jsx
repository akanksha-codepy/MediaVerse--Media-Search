import { useSelector } from 'react-redux'
import { selectFavorites } from '../redux/features/collectionSlice'
import ResultGrid from '../components/ResultGrid'
export default function CollectionPage() { const favorites = useSelector(selectFavorites); return <main className="page saved-page"><section className="page-heading"><p className="eyebrow">PERSONAL COLLECTION</p><h1>Saved inspiration.</h1><p>A handpicked library of visuals you want to keep close.</p></section><ResultGrid items={favorites} /></main> }
