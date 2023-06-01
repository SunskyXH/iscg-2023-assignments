import { FC, memo } from 'react'

interface Props {
  armLength: number
}

const Joint: FC<Props> = (props) => {
  const { armLength } = props
  return (
    <mesh castShadow position={[0, armLength / 2, 0]}>
      <cylinderGeometry args={[2, 2, armLength, 5]}></cylinderGeometry>
      <meshLambertMaterial color={'white'}></meshLambertMaterial>
    </mesh>
  )
}

export default memo(Joint)
