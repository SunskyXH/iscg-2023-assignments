'use client'
import SidebarItem from '@/components/SidebarItem'
import Canvas from '@/components/a1/Canvas'
import { useState } from 'react'

const tabs = [{ title: 'CCD法', desc: '3D Cyclic Coordinate Descent Method', id: 'ccd' }]

export default function A1() {
  const [tab, setTab] = useState<string>('ccd')
  return (
    <main className="flex h-screen items-center p-24 pr-0">
      <div className="flex h-full w-60 flex-shrink-0 flex-col gap-y-4">
        <div className="px-5 py-4">
          <h1 className="text-xl font-bold">基本課題A1</h1>
          <span className="text-sm opacity-50">Inverse Kinematics</span>
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
