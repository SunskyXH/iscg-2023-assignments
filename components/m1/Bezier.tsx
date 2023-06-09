'use client'
import { Canvas } from '@react-three/fiber'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import ControlPoint from './common/ControlPoint'
import SamplePoint from './common/SamplePoint'
import Line from './common/Line'
import GridHelper from './common/GridHelper'
import { calcSamplePoints } from './utils/bezier'

interface Props {}

const initControlPoints = [
  new THREE.Vector3(-10, 10, 0),
  new THREE.Vector3(-20, 0, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(-10, -10, 0),
  new THREE.Vector3(10, 10, 0),
  new THREE.Vector3(0, -10, 0),
  new THREE.Vector3(20, 0, 0),
  new THREE.Vector3(10, -10, 0),
]

const Bezier: FC<Props> = () => {
  const [controlPoints, setControlPoints] = useState<THREE.Vector3[]>(initControlPoints)
  const [samplePoints, setSamplePoints] = useState<THREE.Vector3[]>([])

  const { sampleCount, controlCount } = useControls({
    sampleCount: { value: 30, min: 10, max: 100, step: 1 },
    controlCount: { value: 8, min: 2, max: 8, step: 1 },
  })

  const activeControlPoints = useMemo(
    () => controlPoints.slice(0, controlCount),
    [controlCount, controlPoints],
  )

  const init = useCallback(() => {
    const sp = calcSamplePoints(activeControlPoints, sampleCount)
    setSamplePoints((prev) => [...prev, ...sp])
  }, [activeControlPoints, sampleCount])

  const update = useCallback(() => {
    const sp = calcSamplePoints(activeControlPoints, sampleCount)
    setSamplePoints(sp)
  }, [activeControlPoints, sampleCount])

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
      {activeControlPoints.map((controlPoint, index) => (
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
      <Line points={[activeControlPoints[0], activeControlPoints[1]]} />
      <Line
        points={[
          activeControlPoints[activeControlPoints.length - 2],
          activeControlPoints[activeControlPoints.length - 1],
        ]}
      />
      <Line points={samplePoints} />
    </Canvas>
  )
}

export default memo(Bezier)
