import { useDispatch, useSelector } from 'react-redux'
import { selectSearch, setActiveTab } from '../redux/features/searchSlice'
const tabs = [{ id: 'photos', label: 'Photos', icon: '◉' }, { id: 'videos', label: 'Videos', icon: '▶' }, { id: 'gifs', label: 'GIFs', icon: '✦' }]
export default function Tabs() { const dispatch = useDispatch(); const { activeTab } = useSelector(selectSearch); const change = (id) => dispatch(setActiveTab(id)); return <div className="tabs">{tabs.map((tab) => <button key={tab.id} onClick={() => change(tab.id)} className={activeTab === tab.id ? 'active' : ''}><span>{tab.icon}</span>{tab.label}</button>)}</div> }
