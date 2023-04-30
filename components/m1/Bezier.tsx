'use client'
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'
import ControlPoint from './ControlPoint'
import SamplePoint from './SamplePoint'
import Line from './Line'
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

  const gridHelperRef = useRef<THREE.GridHelper>(null)

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
    const gridHelper = gridHelperRef.current
    if (gridHelper) {
      gridHelper.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1.5708)
      gridHelper.position.z = -2
    }
  }, [])

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    update()
  }, [update])

  return (
    <>
      <gridHelper ref={gridHelperRef} args={[50, 10, 0xff0000, 'teal']} />
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
    </>
  )
}

export default memo(Bezier)
