import { Link, Outlet, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function AdminLayout() {
  const navigate = useNavigate()
  async function handleLogout() {
    await api.logout()
    navigate('/admin/login')
  }
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="bg-gray-900 text-white p-4 space-y-4">
        <div className="text-lg font-semibold">后台管理</div>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:opacity-80">仪表盘</Link>
          <Link to="/admin/destinations" className="block hover:opacity-80">景点信息</Link>
          <Link to="/admin/itineraries" className="block hover:opacity-80">旅游路线</Link>
          <Link to="/admin/gallery" className="block hover:opacity-80">图片资源</Link>
          <Link to="/admin/users" className="block hover:opacity-80">用户</Link>
          <Link to="/admin/bookings" className="block hover:opacity-80">预订</Link>
        </nav>
        <button onClick={handleLogout} className="mt-6 w-full bg-gray-700 hover:bg-gray-600 rounded px-3 py-2">退出登录</button>
      </aside>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}