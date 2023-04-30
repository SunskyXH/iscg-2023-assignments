import { FC, memo } from 'react'
import { Vector3, BufferGeometry } from 'three'

interface Props {
  points: Vector3[]
}

const Line: FC<Props> = (props) => {
  const { points } = props
  const lineGeometry = new BufferGeometry().setFromPoints(points).translate(0, 0, -1)
  return (
    // @ts-ignore
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="black" />
    </line>
  )
}

export default memo(Line)
