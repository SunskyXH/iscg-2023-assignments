'use client'
import { FC, memo } from 'react'

interface Props {}

const Light: FC<Props> = () => {
  return (
    <>
      <hemisphereLight args={[0xffffff, 0xbbbbbb]} position={[0, 200, 0]}></hemisphereLight>
      <directionalLight args={[0xffffff]} position={[0, 200, 150]} castShadow></directionalLight>
    </>
  )
}

export default memo(Light)
