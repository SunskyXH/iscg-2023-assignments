'use client'
import { Canvas } from '@react-three/fiber'
import { FC, memo } from 'react'
import Joints from './Joints'
import Light from './Light'
import Ground from './Ground'

interface Props {}

const CCD: FC<Props> = () => {
  return (
    <Canvas
      shadows="basic"
      camera={{
        position: [150, 150, 150],
        fov: 55,
        aspect: 16 / 9,
        near: 1,
        far: 5000,
      }}
    >
      <Light />

      {/* joint */}
      <Joints />

      {/* ground */}
      <Ground />
    </Canvas>
  )
}

export default memo(CCD)
