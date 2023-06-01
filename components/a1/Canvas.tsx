import { FC, memo } from 'react'
import CCD from './CCD'

interface Props {
  id: string
}

const Canvas: FC<Props> = (props) => {
  const { id } = props
  return <div className="flex h-full w-full">{id === 'ccd' && <CCD />}</div>
}

export default memo(Canvas)
