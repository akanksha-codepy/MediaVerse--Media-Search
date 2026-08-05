import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveToCollection, selectFavorites, toggleFavorite } from '../redux/features/collectionSlice'

function ResultCard({ item, onPreview, notify }) {
  const dispatch = useDispatch(); const favorites = useSelector(selectFavorites); const saved = favorites.some((favorite) => favorite.id === item.id && favorite.type === item.type)
  const download = async () => { try { const blob = await fetch(item.src).then((res) => res.blob()); const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `mediaverse-${item.id}`; anchor.click(); URL.revokeObjectURL(url); notify('Download started') } catch { window.open(item.src, '_blank'); notify('Opened media in a new tab') } }
  const copy = async () => { await navigator.clipboard?.writeText(item.original || item.src); notify('Link copied to clipboard') }
  const preview = () => onPreview(item)
  const stop = (event) => event.stopPropagation()
  return <article className="media-card" onClick={preview} onKeyDown={(event) => event.key === 'Enter' && preview()} role="button" tabIndex="0" aria-label={`Preview ${item.title}`}><div className="preview">{item.type === 'videos' ? <video src={item.src} poster={item.thumbnail} muted loop autoPlay playsInline /> : <img src={item.thumbnail} alt={item.title} loading="lazy" />}</div><div className="card-overlay"><div className="card-meta"><span className="source-badge">{item.source}</span><small>{item.creator || 'Creator'}</small><h3>{item.title}</h3></div><div className="card-actions"><button title="Download" aria-label="Download" onClick={(event) => { stop(event); download() }}>↓</button><button title="Copy link" aria-label="Copy link" onClick={(event) => { stop(event); copy() }}>↗</button><button title="Add to collection" aria-label="Add to collection" onClick={(event) => { stop(event); dispatch(saveToCollection(item)); notify('Added to Inspiration') }}>＋</button><button title="Favorite" aria-label="Favorite" className={saved ? 'saved' : ''} onClick={(event) => { stop(event); dispatch(toggleFavorite(item)); notify(saved ? 'Removed from saved' : 'Saved to favorites') }}>{saved ? '♥' : '♡'}</button><a className="original-link" title="Open original" href={item.original || item.src} target="_blank" rel="noreferrer" onClick={stop}>Open ↗</a></div></div></article>
}
export default memo(ResultCard)
