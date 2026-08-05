import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRecentlyViewed } from '../redux/features/collectionSlice'
import { searchMedia, selectSearch } from '../redux/features/searchSlice'
import ResultCard from './ResultCard'

function Skeletons() { return <div className="grid masonry">{Array.from({ length: 10 }, (_, index) => <div className="skeleton" key={index} />)}</div> }
export default function ResultGrid({ items: overrideItems }) {
  const dispatch = useDispatch(); const { query, activeTab, results, loading, loadingMore, error, page, hasMore } = useSelector(selectSearch); const items = overrideItems || results; const [preview, setPreview] = useState(null); const [toast, setToast] = useState(''); const bottomRef = useRef(null)
  useEffect(() => { if (!overrideItems && query) dispatch(searchMedia({ query, type: activeTab })) }, [dispatch, activeTab, query, overrideItems])
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && hasMore && !loadingMore && !loading && !overrideItems) dispatch(searchMedia({ query, type: activeTab, page: page + 1, append: true })) }, { rootMargin: '400px' }); if (bottomRef.current) observer.observe(bottomRef.current); return () => observer.disconnect() }, [dispatch, query, activeTab, page, hasMore, loadingMore, loading, overrideItems])
  const notify = useCallback((message) => { setToast(message); window.setTimeout(() => setToast(''), 2400) }, [])
  const openPreview = useCallback((item) => { setPreview(item); dispatch(addRecentlyViewed(item)) }, [dispatch])
  if (loading) return <Skeletons />
  if (error) return <section className="state"><div>⚡</div><h2>We hit a snag</h2><p>{error}</p><button onClick={() => dispatch(searchMedia({ query, type: activeTab }))}>Try again</button></section>
  if (!items.length) return <section className="state"><div className="empty-illustration"><i /><i /><i /></div><h2>{query ? 'No visual matches yet' : 'Start exploring amazing media'}</h2><p>{query ? 'Try another phrase, or explore a different media type.' : 'Search photos, videos, and GIFs from creators around the world.'}</p></section>
  return <><div className="grid masonry">{items.map((item) => <motion.div layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} key={`${item.type}-${item.id}`}><ResultCard item={item} onPreview={openPreview} notify={notify} /></motion.div>)}</div>{loadingMore && <div className="loading-more"><i /> Loading more inspiration</div>}<div ref={bottomRef} /><AnimatePresence>{preview && <MediaModal item={preview} close={() => setPreview(null)} notify={notify} />}</AnimatePresence>{toast && <div className="toast">✓ {toast}</div>}</>
}
function MediaModal({ item, close, notify }) { useEffect(() => { const handler = (event) => event.key === 'Escape' && close(); window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [close]); return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={close}><motion.div className="modal" initial={{ scale: .96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96 }} onMouseDown={(event) => event.stopPropagation()}><button className="close" onClick={close}>×</button>{item.type === 'videos' ? <video src={item.src} controls autoPlay /> : <img src={item.src} alt={item.title} />}<footer><div><span>{item.source} · {item.creator || 'Creator'}</span><h2>{item.title}</h2></div><button onClick={() => { navigator.clipboard?.writeText(item.original || item.src); notify('Link copied to clipboard') }}>Copy link</button></footer></motion.div></motion.div> }
