import Link from 'next/link'
import { FC, memo } from 'react'
import cx from 'classnames'

interface Props {
  title: string
  desc: string
  href: string
  wip?: boolean
}

const SidebarItem: FC<Props> = (props) => {
  const { href, title, desc, wip } = props
  return (
    <Link
      href={href}
      className={cx(
        'group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30',
        wip && 'cursor-not-allowed',
      )}
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">{desc}</p>
    </Link>
  )
}

export default memo(SidebarItem)
