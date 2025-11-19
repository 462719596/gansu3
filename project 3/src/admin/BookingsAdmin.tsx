import { useEffect, useState } from 'react'
import { api } from '../services/api'

type Booking = { id: string; userId: string; itineraryId: string; startDate: string; peopleCount: number; price: number; status: 'pending' | 'confirmed' | 'cancelled' }

export default function BookingsAdmin() {
  const [items, setItems] = useState<Booking[]>([])
  const [form, setForm] = useState<Partial<Booking>>({ status: 'pending' })

  async function load() { setItems(await api.listBookings()) }
  useEffect(() => { load() }, [])

  async function create() {
    await api.createBooking({ userId: form.userId, itineraryId: form.itineraryId, startDate: form.startDate, peopleCount: Number(form.peopleCount) || 1, price: Number(form.price) || 0, status: form.status || 'pending' })
    setForm({ status: 'pending' }); await load()
  }

  async function update(id: string, patch: Partial<Booking>) { await api.updateBooking(id, patch); await load() }
  async function remove(id: string) { await api.deleteBooking(id); await load() }

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">预订管理</div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="用户ID" value={form.userId || ''} onChange={e => setForm({ ...form, userId: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="路线ID" value={form.itineraryId || ''} onChange={e => setForm({ ...form, itineraryId: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="开始日期" value={form.startDate || ''} onChange={e => setForm({ ...form, startDate: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="人数" value={form.peopleCount?.toString() || ''} onChange={e => setForm({ ...form, peopleCount: Number(e.target.value) })} />
          <input className="w-full border rounded px-3 py-2" placeholder="价格" value={form.price?.toString() || ''} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
          <select className="w-full border rounded px-3 py-2" value={form.status || 'pending'} onChange={e => setForm({ ...form, status: e.target.value as any })}>
            <option value="pending">待确认</option>
            <option value="confirmed">已确认</option>
            <option value="cancelled">已取消</option>
          </select>
          <button className="bg-black text-white rounded px-3 py-2" onClick={create}>新增预订</button>
        </div>
        <div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">用户ID</th>
                <th className="border-b p-2">路线ID</th>
                <th className="border-b p-2">状态</th>
                <th className="border-b p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td className="border-b p-2">{i.userId}</td>
                  <td className="border-b p-2">{i.itineraryId}</td>
                  <td className="border-b p-2">{i.status}</td>
                  <td className="border-b p-2 space-x-2">
                    <button className="px-2 py-1 bg-gray-800 text-white rounded" onClick={() => update(i.id, { status: 'confirmed' })}>确认</button>
                    <button className="px-2 py-1 bg-yellow-600 text-white rounded" onClick={() => update(i.id, { status: 'pending' })}>设为待确认</button>
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