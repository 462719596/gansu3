import { useEffect, useState } from 'react'
import { api } from '../services/api'

type Itinerary = { id: string; title: string; days: number; price: number; description?: string; coverImageUrl?: string }

export default function ItinerariesAdmin() {
  const [items, setItems] = useState<Itinerary[]>([])
  const [form, setForm] = useState<Partial<Itinerary>>({})
  const [editingId, setEditingId] = useState<string | null>(null)

  async function load() { setItems(await api.listItineraries()) }
  useEffect(() => { load() }, [])

  async function save() {
    const payload = { title: form.title || '', days: Number(form.days) || 0, price: Number(form.price) || 0, description: form.description || '', coverImageUrl: form.coverImageUrl || '' }
    if (editingId) await api.updateItinerary(editingId, payload)
    else await api.createItinerary(payload)
    setForm({}); setEditingId(null); await load()
  }

  async function edit(item: Itinerary) { setEditingId(item.id); setForm(item) }
  async function remove(id: string) { await api.deleteItinerary(id); await load() }

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">路线管理</div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="标题" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="天数" value={form.days?.toString() || ''} onChange={e => setForm({ ...form, days: Number(e.target.value) })} />
          <input className="w-full border rounded px-3 py-2" placeholder="价格" value={form.price?.toString() || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
          <input className="w-full border rounded px-3 py-2" placeholder="封面图片URL" value={form.coverImageUrl || ''} onChange={e => setForm({ ...form, coverImageUrl: e.target.value })} />
          <textarea className="w-full border rounded px-3 py-2" placeholder="描述" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
          <button className="bg-black text-white rounded px-3 py-2" onClick={save}>{editingId ? '保存修改' : '新增路线'}</button>
        </div>
        <div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">标题</th>
                <th className="border-b p-2">天数</th>
                <th className="border-b p-2">价格</th>
                <th className="border-b p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td className="border-b p-2">{i.title}</td>
                  <td className="border-b p-2">{i.days}</td>
                  <td className="border-b p-2">{i.price}</td>
                  <td className="border-b p-2 space-x-2">
                    <button className="px-2 py-1 bg-gray-800 text-white rounded" onClick={() => edit(i)}>编辑</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => remove(i.id)}>删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}