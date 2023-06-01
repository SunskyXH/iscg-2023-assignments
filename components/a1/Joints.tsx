import { FC, memo, useCallback, useMemo, useRef } from 'react'
import { useControls } from 'leva'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'
import Draggable from '../m1/common/Draggable'
import Joint from './Joint'

interface Props {}

interface Joint {
  position: THREE.Vector3
  axis: THREE.Vector3
  limit: [number, number]
}

function degreeToRadince(degree: number) {
  return degree * (Math.PI / 180)
}

const Joints: FC<Props> = () => {
  const jointsRefs = useRef<THREE.Group[]>([])
  const endRef = useRef<THREE.Group>(null)
  const targetRef = useRef<THREE.Mesh>(null)

  const { jointCount, armLength } = useControls({
    jointCount: { value: 5, min: 1, max: 10, step: 1 },
    armLength: { value: 15, min: 10, max: 20, step: 1 },
  })

  const joints = useMemo(() => {
    const joints: Joint[] = [
      {
        position: new THREE.Vector3(0, 0, 0),
        axis: new THREE.Vector3(0, 0, 0),
        limit: [-180, 180],
      },
    ]
    for (let i = 1; i < jointCount; i++) {
      joints.push({
        position: new THREE.Vector3(0, armLength, 0),
        axis: new THREE.Vector3(0, 0, 0),
        limit: i === jointCount - 1 ? [-180, 180] : [-90, 90],
      })
    }
    return joints
  }, [armLength, jointCount])

  useFrame(() => {
    const jointsList = jointsRefs.current
    const end = endRef.current
    if (!jointsList.length || !end || !targetRef.current) return
    const targetPosition = targetRef.current.position
    const jointPosition = new THREE.Vector3()

    // traverse from end to root
    for (var i = jointCount - 1; i >= 0; i--) {
      jointsList[i].updateMatrixWorld()
      end.getWorldPosition(jointPosition)

      // calculate angle
      const angle = new THREE.Quaternion(0, 0, 0, 1).setFromUnitVectors(
        jointsList[i].worldToLocal(jointPosition.clone()).normalize(),
        jointsList[i].worldToLocal(targetPosition.clone()).normalize(),
      )
      jointsList[i].quaternion.multiply(angle)

      const parentAxis = joints[i].axis
        .clone()
        .applyQuaternion(jointsList[i].quaternion.clone().invert())
      angle.setFromUnitVectors(joints[i].axis, parentAxis)
      jointsList[i].quaternion.multiply(angle)

      // constraints
      const minAngle = degreeToRadince(joints[i].limit[0])
      const maxAngle = degreeToRadince(joints[i].limit[1])
      const clampRotation = new THREE.Vector3()
        .setFromEuler(jointsList[i].rotation)
        .clampScalar(minAngle, maxAngle)
      jointsList[i].rotation.setFromVector3(clampRotation)
      jointsList[i].updateMatrixWorld()
    }
  })

  const renderJoints = useCallback(
    (index: number) => {
      if (index >= jointCount) return null
      const isLast = index === jointCount - 1
      return (
        <group position={joints[index].position} ref={(el) => (jointsRefs.current[index] = el!)}>
          <Joint armLength={armLength} />
          {renderJoints(index + 1)}
          <group visible={isLast} ref={isLast ? endRef : undefined} position={[0, armLength, 0]}>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[1, 16, 32]}></sphereGeometry>
              <meshLambertMaterial color={'yellow'}></meshLambertMaterial>
            </mesh>
          </group>
        </group>
      )
    },
    [armLength, jointCount, joints],
  )

  return (
    <>
      {/* joints */}
      {renderJoints(0)}
      {/* target */}
      <Draggable>
        <mesh ref={targetRef} position={[0, 105, 0]} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 16, 32]}></sphereGeometry>
          <meshLambertMaterial color={'hotpink'}></meshLambertMaterial>
        </mesh>
      </Draggable>
    </>
  )
}

export default memo(Joints)
