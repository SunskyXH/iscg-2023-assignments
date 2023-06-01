import { FC, memo } from 'react'

interface Props {}

const Ground: FC<Props> = () => {
  return <gridHelper args={[1000, 20, 0xbbbbbb, 0xbbbbbb]}></gridHelper>
}

export default memo(Ground)
