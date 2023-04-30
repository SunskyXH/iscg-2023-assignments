import { FC, memo } from 'react'
import * as THREE from 'three'

export interface SamplePointProps {
  radius?: number
  position: THREE.Vector3
}

const SamplePoint: FC<SamplePointProps> = (props) => {
  const { radius = 0.25, position } = props
  return (
    <mesh position={position}>
      <circleGeometry args={[radius, 32]} />
      <meshBasicMaterial color="yellow" side={THREE.DoubleSide} />
    </mesh>
  )
}

export default memo(SamplePoint)
