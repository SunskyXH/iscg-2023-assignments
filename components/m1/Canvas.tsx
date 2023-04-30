import { FC, memo } from 'react'

import Bezier from './Bezier'
import Catmull from './Catmull'
interface Props {
  id: string
}

const Canvas: FC<Props> = (props) => {
  const { id } = props
  return (
    <div className="flex h-full w-full">
      {id === 'bezier' && <Bezier />}
      {id === 'catmull' && <Catmull />}
    </div>
  )
}

export default memo(Canvas)
