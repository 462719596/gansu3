const baseUrl = (import.meta as any).env?.VITE_API_BASE_URL || '/api'

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || 'request_failed')
  }
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) return res.json()
  return res.text()
}

export const api = {
  login(email: string, password: string) {
    return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  },
  logout() {
    return request('/auth/logout', { method: 'POST' })
  },
  me() {
    return request('/auth/me')
  },
  listDestinations() {
    return request('/destinations')
  },
  createDestination(payload: any) {
    return request('/destinations', { method: 'POST', body: JSON.stringify(payload) })
  },
  updateDestination(id: string, payload: any) {
    return request(`/destinations/${id}`, { method: 'PUT', body: JSON.stringify(payload) })
  },
  deleteDestination(id: string) {
    return request(`/destinations/${id}`, { method: 'DELETE' })
  },
  listItineraries() { return request('/itineraries') },
  createItinerary(payload: any) { return request('/itineraries', { method: 'POST', body: JSON.stringify(payload) }) },
  updateItinerary(id: string, payload: any) { return request(`/itineraries/${id}`, { method: 'PUT', body: JSON.stringify(payload) }) },
  deleteItinerary(id: string) { return request(`/itineraries/${id}`, { method: 'DELETE' }) },
  listGallery() { return request('/gallery') },
  uploadImage(file: File, title?: string) {
    const form = new FormData()
    form.append('file', file)
    if (title) form.append('title', title)
    return fetch(`${baseUrl}/gallery`, { method: 'POST', body: form, credentials: 'include' }).then(r => r.json())
  },
  deleteImage(id: string) { return request(`/gallery/${id}`, { method: 'DELETE' }) },
  listUsers() { return request('/users') },
  createUser(payload: any) { return request('/users', { method: 'POST', body: JSON.stringify(payload) }) },
  updateUser(id: string, payload: any) { return request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(payload) }) },
  deleteUser(id: string) { return request(`/users/${id}`, { method: 'DELETE' }) },
  listBookings() { return request('/bookings') },
  createBooking(payload: any) { return request('/bookings', { method: 'POST', body: JSON.stringify(payload) }) },
  updateBooking(id: string, payload: any) { return request(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify(payload) }) },
  deleteBooking(id: string) { return request(`/bookings/${id}`, { method: 'DELETE' }) },
}

export type User = { id: string; email: string; role: 'admin' | 'user' }