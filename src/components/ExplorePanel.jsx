import { useDispatch, useSelector } from 'react-redux'
import { addRecentSearch, clearRecentSearches, selectSearch, setQuery } from '../redux/features/searchSlice'

const categories = ['Nature', 'Technology', 'Animals', 'Cars', 'Architecture', 'Space', 'Gaming', 'Travel', 'Anime', 'Food', 'Abstract']
const topics = ['Cyberpunk cities', 'Northern lights', 'Brutalist interiors', 'Underwater worlds']
export default function ExplorePanel() {
  const dispatch = useDispatch(); const { recentSearches } = useSelector(selectSearch)
  const search = (term) => { dispatch(setQuery(term)); dispatch(addRecentSearch(term)); window.scrollTo({ top: 420, behavior: 'smooth' }) }
  return <section className="explore-panel"><div className="explore-copy"><p className="eyebrow">START EXPLORING</p><h2>Pick a direction, then follow your curiosity.</h2><p>Discover visual stories from a universe of independent creators.</p></div><div className="explore-groups"><div><h3>Suggested categories</h3><div className="category-list">{categories.map((category) => <button key={category} onClick={() => search(category)}>{category}</button>)}</div></div><div className="topic-list"><h3>Trending topics</h3>{topics.map((topic, index) => <button key={topic} onClick={() => search(topic)}><span>0{index + 1}</span>{topic}<i>↗</i></button>)}</div></div>{recentSearches.length > 0 && <div className="recent-row"><h3>Recent searches</h3><div>{recentSearches.map((term) => <button key={term} onClick={() => search(term)}>⌕ {term}</button>)}<button className="clear" onClick={() => dispatch(clearRecentSearches())}>Clear</button></div></div>}</section>
}
