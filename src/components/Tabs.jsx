import { useDispatch, useSelector } from 'react-redux'
import { selectSearch, setActiveTab } from '../redux/features/searchSlice'

const tabs = [{ id: 'photos', label: 'Photos' }, { id: 'videos', label: 'Videos' }, { id: 'gifs', label: 'GIFs' }]
export default function Tabs() { const dispatch = useDispatch(); const { activeTab } = useSelector(selectSearch); return <div className="tabs">{tabs.map((tab) => <button key={tab.id} onClick={() => dispatch(setActiveTab(tab.id))} className={activeTab === tab.id ? 'active' : ''}>{tab.label}</button>)}</div> }
