import SidebarItem from '@/components/SidebarItem'
import Canvas from '@/components/m1/Canvas'

export const metadata = {
  title: '基本課題M1 - パラメトリック曲線',
}

export default function M1() {
  return (
    <main className="flex h-screen items-center p-24 pr-0">
      <div className="flex h-full w-60 flex-shrink-0 flex-col gap-y-4">
        <div>
          <h1 className="text-xl font-bold">基本課題M1</h1>
          <span className="text-sm opacity-50">パラメトリック曲線</span>
        </div>
        <SidebarItem title="Bézier curve" desc="n-order Bézier curve" active />
      </div>
      <Canvas />
    </main>
  )
}
