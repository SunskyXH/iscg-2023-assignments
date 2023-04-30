import * as THREE from 'three'

function cutmullRom(
  t: number,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3,
  p4: THREE.Vector3,
) {
  const tt = t * t
  const ttt = tt * t

  const q1 = -ttt + 2 * tt - t
  const q2 = 3 * ttt - 5 * tt + 2
  const q3 = -3 * ttt + 4 * tt + t
  const q4 = ttt - tt

  const tx = 0.5 * (p2.x * q1 + p1.x * q2 + p4.x * q3 + p3.x * q4)
  const ty = 0.5 * (p2.y * q1 + p1.y * q2 + p4.y * q3 + p3.y * q4)

  return new THREE.Vector3(tx, ty, 0)
}

export const calcSamplePoints = (controlPoints: THREE.Vector3[], sampleCount: number) => {
  const step = 1 / sampleCount
  let t = 0
  const [p1, p2, p3, p4] = controlPoints
  const samplePoints = []
  for (let i = 0; i < sampleCount; i++) {
    const sample = cutmullRom(t, p1, p2, p3, p4)
    samplePoints.push(sample)
    t += step
  }
  samplePoints.push(new THREE.Vector3(p4.x, p4.y, 0))

  return samplePoints
}
