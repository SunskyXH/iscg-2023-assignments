import * as THREE from 'three'

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

export const calcSamplePoints = (controlPoints: THREE.Vector3[], sampleCount: number) => {
  const step = 1 / sampleCount
  let t = 0
  const samplePoints: THREE.Vector3[] = []
  for (let i = 0; i < sampleCount + 1; i++) {
    const p = computeBezierCurve(controlPoints, t)
    samplePoints.push(new THREE.Vector3(p.x, p.y, 0))
    t += step
  }
  return samplePoints
}
