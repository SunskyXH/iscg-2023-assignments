import * as THREE from 'three'

function cutmullRom(
  t: number,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3,
  p4: THREE.Vector3,
) {
  const t_square = Math.pow(t, 2)
  const t_cubic = Math.pow(t, 3)

  const q1 = -t_cubic + 2 * t_square - t
  const q2 = 3 * t_cubic - 5 * t_square + 2
  const q3 = -3 * t_cubic + 4 * t_square + t
  const q4 = t_cubic - t_square

  return new THREE.Vector3()
    .addScaledVector(p2, q1)
    .addScaledVector(p1, q2)
    .addScaledVector(p4, q3)
    .addScaledVector(p3, q4)
    .multiplyScalar(0.5)
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
