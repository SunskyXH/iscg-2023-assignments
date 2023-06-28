import { FC, memo } from 'react'
import BilateralFilter from './BilateralFilter'

interface Props {
  id: string
}

const Playground: FC<Props> = (props) => {
  const { id } = props
  return <div className="flex h-full w-full">{id === 'bf' && <BilateralFilter />}</div>
}

export default memo(Playground)
