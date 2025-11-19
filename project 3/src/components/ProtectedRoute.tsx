import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { api, User } from '../services/api'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.me().then(u => { if (mounted) setUser(u) }).catch(() => { if (mounted) setUser(null) }).finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="p-6">加载中</div>
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />
  return children
}