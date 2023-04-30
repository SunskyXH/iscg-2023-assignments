'use client'
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import ControlPoint from './ControlPoint'
import SamplePoint from './SamplePoint'
import * as THREE from 'three'
import Line from './Line'

interface Props {}

const computeBezier = (n: number, i: number, t: number): number => {
  if (i < 0 || i > n) {
    return 0
  }
  if (n === 0) {
    return Math.pow(1 - t, i) * Math.pow(t, n - i)
  } else {
    const term1 = (1 - t) * computeBezier(n - 1, i, t)
    const term2 = t * computeBezier(n - 1, i - 1, t)
    return term1 + term2
  }
}

const computeBezierCurve = (controlPoints: THREE.Vector3[], t: number): THREE.Vector3 => {
  const n = controlPoints.length - 1
  let result = new THREE.Vector3(0, 0, 0)
  for (let i = 0; i <= n; i++) {
    result.addScaledVector(controlPoints[i], computeBezier(n, i, t))
  }

  return result
}

// 6-order bezier curve
const initControlPoints = [
  new THREE.Vector3(-20, 0, 0),
  new THREE.Vector3(-10, 10, 0),
  new THREE.Vector3(10, 10, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(0, -10, 0),
  new THREE.Vector3(-10, -10, 0),
  new THREE.Vector3(10, -10, 0),
  new THREE.Vector3(20, 0, 0),
]

const Bezier: FC<Props> = () => {
  const [controlPoints, setControlPoints] = useState<THREE.Vector3[]>(initControlPoints)
  const [samplePoints, setSamplePoints] = useState<THREE.Vector3[]>([])
  const [sampleCount, setSampleCount] = useState<number>(30)
  const gridHelperRef = useRef<THREE.GridHelper>(null)
  const draw = useCallback(() => {
    const step = 1 / sampleCount
    let t = 0

    const newSamplePoints: THREE.Vector3[] = []
    for (let i = 0; i < sampleCount; i++) {
      const p = computeBezierCurve(controlPoints, t)
      newSamplePoints.push(new THREE.Vector3(p.x, p.y, 0))
      t += step
    }
    // the last sample point is the last control point
    newSamplePoints.push(controlPoints[controlPoints.length - 1])
    setSamplePoints((prev) => [...prev, ...newSamplePoints])
  }, [controlPoints, sampleCount])

  useEffect(() => {
    const gridHelper = gridHelperRef.current
    if (gridHelper) {
      gridHelper.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1.5708)
      gridHelper.position.z = -1
    }
  }, [])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <>
      <gridHelper ref={gridHelperRef} args={[50, 10, 0xff0000, 'teal']} />
      {controlPoints.map((controlPoint, index) => (
        <ControlPoint key={index} position={controlPoint} />
      ))}
      {samplePoints.map((samplePoint, index) => (
        <SamplePoint key={index} position={samplePoint} />
      ))}
      <Line points={[controlPoints[0], controlPoints[1]]} />
      <Line
        points={[controlPoints[controlPoints.length - 2], controlPoints[controlPoints.length - 1]]}
      />
      <Line points={samplePoints} />
    </>
  )
}

export default memo(Bezier)
