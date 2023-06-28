'use client'
import SidebarItem from '@/components/SidebarItem'
import Playground from '@/components/i1/Playground'

import { useState } from 'react'

const tabs = [{ title: 'Bilateral Filter', desc: 'Bilateral Filter', id: 'bf' }]

export default function I1() {
  const [tab, setTab] = useState<string>('bf')
  return (
    <main className="flex h-screen items-center p-24 pr-0">
      <div className="flex h-full w-60 flex-shrink-0 flex-col gap-y-4">
        <div className="px-5 py-4">
          <h1 className="text-xl font-bold">基本課題I1</h1>
          <span className="text-sm opacity-50">画像のフィルタリング</span>
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
      <Playground id={tab} />
    </main>
  )
}
