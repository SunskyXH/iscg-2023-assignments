import { FC, memo } from 'react'

interface Props {}

const GridHelper: FC<Props> = () => {
  return (
    <gridHelper
      args={[50, 10, 0xff0000, 'teal']}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -2]}
    />
  )
}

export default memo(GridHelper)
