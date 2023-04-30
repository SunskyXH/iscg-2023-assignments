import NavigateItem from '@/components/NavigateItem'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center">
        <span>このページには私のコンピュータグラフィクス論の課題(0510029).</span>
        <span className="text-base">
          This page contains my assigments of Computer Graphics(0510029).
        </span>
      </div>
      <div className="mt-12 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left">
        <NavigateItem title="基本課題M1" desc="パラメトリック曲線" href="m1" />
        <NavigateItem title="発展課題M2" desc="サブディビジョンサーフェス" href="#" wip />
        <NavigateItem title="発展課題M3" desc="陰関数形状モデリング" href="#" wip />
      </div>
    </main>
  )
}
