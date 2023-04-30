import Link from 'next/link'
import { FC, memo } from 'react'
import SidebarItem from './SidebarItem'

interface Props {
  title: string
  desc: string
  href: string
  wip?: boolean
  active?: boolean
}

const NavigateLink: FC<Props> = (props) => {
  const { href, ...sidebarItemProps } = props
  return (
    <Link href={href}>
      <SidebarItem {...sidebarItemProps} />
    </Link>
  )
}

export default memo(NavigateLink)
