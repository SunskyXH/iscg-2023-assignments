import { useThree } from '@react-three/fiber'
import { FC, useEffect, useRef } from 'react'
import { DragControls } from 'three-stdlib'

type DraggableProps = {
  children: React.ReactNode
  updatePosition?: (position: THREE.Vector3) => void
}

const Draggable: FC<DraggableProps> = ({ children, updatePosition }) => {
  const ref = useRef<THREE.Group>(null)
  const { camera, gl, scene } = useThree()

  useEffect(() => {
    const controls = new DragControls(ref.current!.children, camera, gl.domElement)
    controls.transformGroup = true
    controls.addEventListener('drag', (evt) => {
      updatePosition?.(evt.object.position)
    })
  }, [camera, gl.domElement, scene, updatePosition])

  return <group ref={ref}>{children}</group>
}
export default Draggable
