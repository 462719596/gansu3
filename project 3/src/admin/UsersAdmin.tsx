import { useEffect, useState } from 'react'
import { api } from '../services/api'

type UserItem = { id: string; email: string; name?: string; role: 'admin' | 'user' }

export default function UsersAdmin() {
  const [items, setItems] = useState<UserItem[]>([])
  const [form, setForm] = useState<{ email: string; name?: string; password?: string; role?: 'admin' | 'user' }>({ email: '' })

  async function load() { setItems(await api.listUsers()) }
  useEffect(() => { load() }, [])

  async function create() {
    await api.createUser({ email: form.email, name: form.name || '', password: form.password || '123456', role: form.role || 'user' })
    setForm({ email: '' }); await load()
  }

  async function update(id: string, patch: Partial<UserItem & { password?: string }>) {
    await api.updateUser(id, patch)
    await load()
  }

  async function remove(id: string) { await api.deleteUser(id); await load() }

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">用户管理</div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <input className="w-full border rounded px-3 py-2" placeholder="邮箱" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="姓名" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="密码" type="password" value={form.password || ''} onChange={e => setForm({ ...form, password: e.target.value })} />
          <select className="w-full border rounded px-3 py-2" value={form.role || 'user'} onChange={e => setForm({ ...form, role: e.target.value as any })}>
            <option value="user">普通用户</option>
            <option value="admin">管理员</option>
          </select>
          <button className="bg-black text-white rounded px-3 py-2" onClick={create}>新增用户</button>
        </div>
        <div>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">邮箱</th>
                <th className="border-b p-2">姓名</th>
                <th className="border-b p-2">角色</th>
                <th className="border-b p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id}>
                  <td className="border-b p-2">{i.email}</td>
                  <td className="border-b p-2">{i.name}</td>
                  <td className="border-b p-2">{i.role}</td>
                  <td className="border-b p-2 space-x-2">
                    <button className="px-2 py-1 bg-gray-800 text-white rounded" onClick={() => update(i.id, { role: i.role === 'admin' ? 'user' : 'admin' })}>切换角色</button>
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