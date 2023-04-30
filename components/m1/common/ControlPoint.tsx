import { FC, memo, useCallback, useRef, useState } from 'react'
import * as THREE from 'three'
import Draggable from './Draggable'

export interface ControlPointProps {
  radius?: number
  position: THREE.Vector3
  updateControlPoint?: (index: number, position: THREE.Vector3) => void
  index: number
}

const ControlPoint: FC<ControlPointProps> = (props) => {
  const { radius = 0.5, position, updateControlPoint, index } = props
  const ref = useRef<THREE.Mesh>(null)

  const updatePosition = useCallback(
    (newPos: THREE.Vector3) => {
      updateControlPoint?.(index, newPos)
    },
    [index, updateControlPoint],
  )

  return (
    <Draggable updatePosition={updatePosition}>
      <mesh ref={ref} position={position}>
        <circleGeometry args={[radius, 32]} />
        <meshBasicMaterial color="hotpink" side={THREE.DoubleSide} />
      </mesh>
    </Draggable>
  )
}

export default memo(ControlPoint)
