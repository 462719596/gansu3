import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      await api.login(email, password)
      navigate('/admin')
    } catch (err: any) {
      setError('登录失败')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow space-y-4">
        <div className="text-xl font-semibold">管理员登录</div>
        {error && <div className="text-red-600">{error}</div>}
        <input className="w-full border rounded px-3 py-2" placeholder="邮箱" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="密码" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-black text-white rounded px-3 py-2">登录</button>
      </form>
    </div>
  )
}