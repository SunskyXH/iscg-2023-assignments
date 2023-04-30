import { FC, memo } from 'react'
import cx from 'classnames'

interface Props {
  title: string
  desc: string
  wip?: boolean
  active?: boolean
  onClick?: () => void
}

const SidebarItem: FC<Props> = (props) => {
  const { title, desc, wip, active, onClick } = props
  return (
    <div
      onClick={onClick}
      className={cx(
        'group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30',
        wip ? 'cursor-not-allowed' : 'cursor-pointer',
        active && 'border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30',
      )}
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">{desc}</p>
    </div>
  )
}

export default memo(SidebarItem)
