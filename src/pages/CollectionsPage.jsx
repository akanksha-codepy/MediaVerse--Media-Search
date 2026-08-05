import { useSelector } from 'react-redux'
import { selectRecentlyViewed } from '../redux/features/collectionSlice'
import ResultGrid from '../components/ResultGrid'
export default function CollectionsPage() { const viewed = useSelector(selectRecentlyViewed); return <main className="page saved-page"><section className="page-heading"><p className="eyebrow">YOUR VISUAL TRAIL</p><h1>Recently viewed.</h1><p>Continue exploring the media that caught your eye.</p></section><ResultGrid items={viewed} /></main> }
