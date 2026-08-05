import axios from 'axios'

const unsplash = axios.create({ baseURL: 'https://api.unsplash.com', headers: { Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}` } })
const pexels = axios.create({ baseURL: 'https://api.pexels.com', headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY } })
const giphy = axios.create({ baseURL: 'https://api.giphy.com/v1/gifs' })

const normalizePhoto = (item) => ({ id: item.id, type: 'photos', title: item.alt_description || item.description || 'Untitled photograph', thumbnail: item.urls.small, src: item.urls.regular, original: item.links.html, source: 'Unsplash', creator: item.user?.name })
const normalizeVideo = (item) => ({ id: item.id, type: 'videos', title: item.user?.name ? `${item.user.name}'s film` : 'Untitled video', thumbnail: item.image, src: item.video_files?.find((file) => file.quality === 'hd')?.link || item.video_files?.[0]?.link, original: item.url, source: 'Pexels', creator: item.user?.name })
const normalizeGif = (item) => ({ id: item.id, type: 'gifs', title: item.title || 'Animated GIF', thumbnail: item.images.fixed_width.url, src: item.images.original.url, original: item.url, source: 'GIPHY', creator: item.username || 'GIPHY' })

export async function getMedia({ query, type, page = 1 }) {
  const trending = !query
  if (type === 'photos') { const { data } = trending ? await unsplash.get('/photos', { params: { page, per_page: 24, order_by: 'popular' } }) : await unsplash.get('/search/photos', { params: { query, page, per_page: 24 } }); const items = (trending ? data : data.results).map(normalizePhoto); return { items, page, hasMore: items.length === 24 } }
  if (type === 'videos') { const { data } = trending ? await pexels.get('/videos/popular', { params: { page, per_page: 18 } }) : await pexels.get('/videos/search', { params: { query, page, per_page: 18 } }); const items = data.videos.map(normalizeVideo); return { items, page, hasMore: data.videos.length === 18 } }
  const endpoint = trending ? '/trending' : '/search'; const { data } = await giphy.get(endpoint, { params: { api_key: import.meta.env.VITE_GIPHY_API_KEY, q: query, limit: 24, offset: (page - 1) * 24, rating: 'g' } }); const items = data.data.map(normalizeGif); return { items, page, hasMore: data.pagination?.total_count > page * 24 }
}
