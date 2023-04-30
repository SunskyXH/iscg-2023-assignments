import { FC, memo } from 'react'
import * as THREE from 'three'

export interface ControlPointProps {
  radius?: number

  position: THREE.Vector3
}

const ControlPoint: FC<ControlPointProps> = (props) => {
  const { radius = 0.5, position } = props
  return (
    <mesh position={position}>
      <circleGeometry args={[radius, 32]} />
      <meshBasicMaterial color="hotpink" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default memo(ControlPoint)
