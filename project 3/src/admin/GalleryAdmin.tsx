import { useEffect, useState } from 'react'
import { api } from '../services/api'

type ImageItem = { id: string; title?: string; url: string }

export default function GalleryAdmin() {
  const [items, setItems] = useState<ImageItem[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')

  async function load() { setItems(await api.listGallery()) }
  useEffect(() => { load() }, [])

  async function upload() {
    if (!file) return
    await api.uploadImage(file, title)
    setFile(null); setTitle(''); await load()
  }

  async function remove(id: string) { await api.deleteImage(id); await load() }

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">图片资源管理</div>
      <div className="flex items-center gap-3">
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <input className="border rounded px-3 py-2" placeholder="标题（可选）" value={title} onChange={e => setTitle(e.target.value)} />
        <button className="bg-black text-white rounded px-3 py-2" onClick={upload}>上传</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {items.map(i => (
          <div key={i.id} className="border rounded overflow-hidden">
            <img src={i.url} alt={i.title} className="w-full h-32 object-cover" />
            <div className="p-2 flex justify-between items-center">
              <span>{i.title}</span>
              <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => remove(i.id)}>删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}