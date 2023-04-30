'use client'
import SidebarItem from '@/components/SidebarItem'
import Canvas from '@/components/m1/Canvas'
import { useState } from 'react'

const tabs = [
  { title: 'Bézier curve', desc: 'n-order Bézier curve', id: 'bezier' },
  { title: 'Catmull-Rom', desc: '3-order Catmull-Rom spline', id: 'catmull' },
]

export default function M1() {
  const [tab, setTab] = useState<string>('bezier')
  return (
    <main className="flex h-screen items-center p-24 pr-0">
      <div className="flex h-full w-60 flex-shrink-0 flex-col gap-y-4">
        <div>
          <h1 className="text-xl font-bold">基本課題M1</h1>
          <span className="text-sm opacity-50">パラメトリック曲線</span>
        </div>
        {tabs.map((_tab, id) => (
          <SidebarItem
            key={id}
            title={_tab.title}
            desc={_tab.desc}
            active={_tab.id === tab}
            onClick={() => setTab(_tab.id)}
          />
        ))}
      </div>
      <Canvas id={tab} />
    </main>
  )
}
