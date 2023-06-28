export function smoothBilateral(
  width: number,
  height: number,
  original: Uint8ClampedArray,
  smoothed: Uint8ClampedArray,
  sigmaSpace: number,
  sigmaRange: number,
) {
  const r = Math.ceil(sigmaSpace * 3)
  const r2 = 2 * r + 1
  // precompute spatial stencil
  const stencil = new Float32Array(r2 * r2)
  for (let dy = -r; dy <= r; ++dy)
    for (let dx = -r; dx <= r; ++dx) {
      const h = Math.sqrt(dx * dx + dy * dy)
      const idx = dx + r + r2 * (dy + r)
      stencil[idx] = Math.exp((-h * h) / (2 * sigmaSpace * sigmaSpace))
    }
  // apply filter
  for (let py = 0; py < height; py++)
    for (let px = 0; px < width; px++) {
      const idx0 = px + width * py
      let rSum = 0
      let gSum = 0
      let bSum = 0
      let wSum = 0
      for (let dy = -r; dy <= r; ++dy)
        for (let dx = -r; dx <= r; ++dx) {
          const px1 = px + dx
          const py1 = py + dy
          if (0 <= px1 && 0 <= py1 && px1 < width && py1 < height) {
            const w_space = stencil[dx + r + r2 * (dy + r)]
            const idx1 = px1 + width * py1
            const r1 = original[4 * idx1]
            const g1 = original[4 * idx1 + 1]
            const b1 = original[4 * idx1 + 2]
            const r0 = original[4 * idx0]
            const g0 = original[4 * idx0 + 1]
            const b0 = original[4 * idx0 + 2]
            const colorDistance = Math.sqrt(
              (r1 - r0) * (r1 - r0) + (g1 - g0) * (g1 - g0) + (b1 - b0) * (b1 - b0),
            )
            const w_range = Math.exp(
              (-colorDistance * colorDistance) / (2 * sigmaRange * sigmaRange),
            )
            const w = w_space * w_range
            rSum += w * r1
            gSum += w * g1
            bSum += w * b1
            wSum += w
          }
        }
      smoothed[4 * idx0] = rSum / wSum
      smoothed[4 * idx0 + 1] = gSum / wSum
      smoothed[4 * idx0 + 2] = bSum / wSum
      smoothed[4 * idx0 + 3] = 255
    }
}
export function subtract(
  width: number,
  height: number,
  original: Uint8ClampedArray,
  smoothed: Uint8ClampedArray,
  detail: Uint8ClampedArray,
) {
  for (let i = 0; i < width * height; ++i) {
    for (let j = 0; j < 3; ++j) {
      const ij = 4 * i + j
      detail[ij] = 128 + original[ij] - smoothed[ij]
    }
    detail[4 * i + 3] = 255
  }
}
export function enhanceDetail(
  width: number,
  height: number,
  smoothed: Uint8ClampedArray,
  detail: Uint8ClampedArray,
  scaling: number,
  enhanced: Uint8ClampedArray,
) {
  for (let i = 0; i < width * height; ++i) {
    for (let j = 0; j < 3; ++j) {
      const ij = 4 * i + j
      enhanced[ij] = Math.min(255, Math.max(0, smoothed[ij] + scaling * (detail[ij] - 128)))
    }
    enhanced[4 * i + 3] = 255
  }
}
