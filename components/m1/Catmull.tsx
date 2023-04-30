'use client'
import { Canvas } from '@react-three/fiber'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import ControlPoint from './common/ControlPoint'
import SamplePoint from './common/SamplePoint'
import Line from './common/Line'
import GridHelper from './common/GridHelper'
import { calcSamplePoints } from './utils/catmull'

interface Props {}

const initControlPoints = [
  new THREE.Vector3(-20, 0, 0),
  new THREE.Vector3(-10, 10, 0),
  new THREE.Vector3(10, -10, 0),
  new THREE.Vector3(20, 0, 0),
]

const Catmull: FC<Props> = () => {
  const [controlPoints, setControlPoints] = useState<THREE.Vector3[]>(initControlPoints)
  const [samplePoints, setSamplePoints] = useState<THREE.Vector3[]>([])

  const { sampleCount } = useControls({
    sampleCount: { value: 30, min: 10, max: 100, step: 1 },
  })

  const init = useCallback(() => {
    const sp = calcSamplePoints(controlPoints, sampleCount)
    setSamplePoints((prev) => [...prev, ...sp])
  }, [controlPoints, sampleCount])

  const update = useCallback(() => {
    const sp = calcSamplePoints(controlPoints, sampleCount)
    setSamplePoints(sp)
  }, [controlPoints, sampleCount])

  const updateControlPoint = useCallback((index: number, position: THREE.Vector3) => {
    setControlPoints((controlPoints) => {
      const newControlPoints = [...controlPoints]
      newControlPoints[index] = position
      return newControlPoints
    })
  }, [])

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    update()
  }, [update])

  return (
    <Canvas camera={{ position: [0, 0, 60], fov: 45, aspect: 16 / 9, near: 1, far: 500 }}>
      <GridHelper />
      {controlPoints.map((controlPoint, index) => (
        <ControlPoint
          key={index}
          position={controlPoint}
          index={index}
          updateControlPoint={updateControlPoint}
        />
      ))}
      {samplePoints.map((samplePoint, index) => (
        <SamplePoint key={index} position={samplePoint} />
      ))}
      <Line points={[controlPoints[0], controlPoints[1]]} />
      <Line points={[controlPoints[2], controlPoints[3]]} />
      <Line points={samplePoints} />
    </Canvas>
  )
}

export default memo(Catmull)
