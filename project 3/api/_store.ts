type Item = { id: string; [k: string]: any }

function createStore() {
  const genId = () => Math.random().toString(36).slice(2)
  const makeCrud = (init: Item[] = []) => {
    const data: Item[] = [...init]
    return {
      list: () => data,
      create: (payload: any) => { const item = { id: genId(), ...payload }; data.push(item); return item },
      update: (id: string, payload: any) => { const i = data.findIndex(x => x.id === id); if (i === -1) return null; data[i] = { ...data[i], ...payload }; return data[i] },
      remove: (id: string) => { const i = data.findIndex(x => x.id === id); if (i === -1) return null; const [d] = data.splice(i, 1); return d },
      get: (id: string) => data.find(x => x.id === id) || null,
    }
  }

  const destinations = makeCrud([{ id: 'd1', name: '敦煌莫高窟', description: '世界文化遗产' }])
  const itineraries = makeCrud([{ id: 'i1', title: '丝路三日游', days: 3 }])
  const users = makeCrud([{ id: 'u1', email: 'admin@example.com', role: 'admin' }])
  const bookings = makeCrud([])
  const gallery = makeCrud([])

  return { destinations, itineraries, users, bookings, gallery }
}

export const store = createStore()

