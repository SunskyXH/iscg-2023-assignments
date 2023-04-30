import { useFrame } from '@react-three/fiber'
import { FC, forwardRef, memo, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  points: THREE.Vector3[]
}

const Line = forwardRef<THREE.Line, Props>((props, ref) => {
  const { points } = props

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points).translate(0, 0, -1)

  return (
    // @ts-ignore
    <line geometry={lineGeometry} ref={ref}>
      <lineBasicMaterial color="black" />
    </line>
  )
})
Line.displayName = 'Line'

export default memo(Line)
