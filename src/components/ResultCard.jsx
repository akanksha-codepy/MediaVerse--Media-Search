import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { selectFavorites, toggleFavorite } from '../redux/features/collectionSlice'

function ResultCard({ item, onPreview, notify }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const favorites = useSelector(selectFavorites)
  const saved = favorites.some((favorite) => favorite.id === item.id && favorite.type === item.type)
  const preview = () => onPreview(item)
  const stop = (event) => event.stopPropagation()
  const download = async (event) => {
    stop(event)
    try {
      const blob = await fetch(item.src).then((res) => res.blob())
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `mediaverse-${item.id}`
      anchor.click()
      URL.revokeObjectURL(url)
      notify('Download started')
    } catch {
      window.open(item.src, '_blank')
      notify('Opened media in a new tab')
    }
  }
  return <article className="media-card" onClick={preview} onKeyDown={(event) => event.key === 'Enter' && preview()} role="button" tabIndex="0" aria-label={`Preview ${item.title}`}>
    <div className="preview">{item.type === 'videos' ? <video src={item.src} poster={item.thumbnail} muted loop autoPlay playsInline /> : <img src={item.thumbnail} alt={item.title} loading="lazy" />}</div>
    <div className="card-overlay"><div className="card-meta"><small>{item.creator || item.source}</small><h3>{item.title}</h3></div><div className="card-actions"><button title="Download" aria-label="Download" onClick={download}>Download</button><button title={saved ? 'Remove from saved' : 'Save to favorites'} aria-label={saved ? 'Remove from saved' : 'Save to favorites'} className={saved ? 'saved' : ''} onClick={(event) => { stop(event); dispatch(toggleFavorite(item)); notify(saved ? 'Removed from saved' : 'Saved to favorites') }}>{saved && location.pathname === '/favorites' ? 'Remove' : saved ? 'Saved' : 'Save'}</button><a title="Open original source" href={item.original || item.src} target="_blank" rel="noreferrer" onClick={stop}>Open</a></div></div>
  </article>
}
export default memo(ResultCard)
