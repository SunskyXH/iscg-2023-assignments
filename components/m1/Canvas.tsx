'use client'
import { FC, memo } from 'react'

import { Canvas as ThreeCanvas } from '@react-three/fiber'
import Bezier from './Bezier'
interface Props {}

const Canvas: FC<Props> = () => {
  return (
    <div className="h-[1080px] w-[1920px]">
      <ThreeCanvas camera={{ position: [0, 0, 100], fov: 45, aspect: 16 / 9, near: 1, far: 500 }}>
        <Bezier />
      </ThreeCanvas>
    </div>
  )
}

export default memo(Canvas)