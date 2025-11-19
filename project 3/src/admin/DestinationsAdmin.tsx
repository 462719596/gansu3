import { useEffect, useState } from 'react'
import { api } from '../services/api'

type Destination = {
  id: string
  name: string
  region?: string
  type?: string
  description?: string
  coverImageUrl?: string
  location?: string
  tags?: string[]
}

export default function DestinationsAdmin() {
  const [items, setItems] = useState<Destination[]>([])
  const [form, setForm] = useState<Partial<Destination>>({})
  const [editingId, setEditingId] = useState<string | null>(null)

  async function load() {
    const data = await api.listDestinations()
    setItems(data)
  }

  useEffect(() => { load() }, [])

  async function save() {
    const payload = { name: form.name || '' , region: form.region || '', type: form.type || '', description: form.description || '', coverImageUrl: form.coverImageUrl || '', location: form.location || '', tags: form.tags || [] }
    if (editingId) {
      await api.updateDestination(editingId, payload)
    } else {
      await api.createDestination(payload)
    }
    setForm({})
    setEditingId(null)
    await load()
  }

  async function edit(item: Destination) {
    setEditingId(item.id)
    setForm(item)
  }

  async function remove(id: string) {
    await api.deleteDestination(id)
    await load()
  }

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">景点管理</div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="名称" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="地区" value={form.region || ''} onChange={e => setForm({ ...form, region: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="类型" value={form.type || ''} onChange={e => setForm({ ...form, type: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="封面图片URL" value={form.coverImageUrl || ''} onChange={e => setForm({ ...form, coverImageUrl: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="坐标或地址" value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })} />
          <textarea className="w-full border rounded px-3 py-2" placeholder="描述" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
          <button className="bg-black text-white rounded px-3 py-2" onClick={save}>{editingId ? '保存修改' : '新增景点'}</button>
        </div>
        <div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">名称</th>
                <th className="border-b p-2">地区</th>
                <th className="border-b p-2">类型</th>
                <th className="border-b p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td className="border-b p-2">{i.name}</td>
                  <td className="border-b p-2">{i.region}</td>
                  <td className="border-b p-2">{i.type}</td>
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