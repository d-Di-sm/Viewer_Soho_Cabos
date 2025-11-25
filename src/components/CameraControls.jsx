import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { CameraModes, useCharacterCustomization } from "../contexts/CustomizationContext"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

import { useControls } from 'leva'


const cameraPositions = {
    [CameraModes.MASTERPLAN]: {
        position: new THREE.Vector3(95, 110, 205),
        target: new THREE.Vector3(-40,-105,-115),
    },
    [CameraModes.AMENIDADES]: {
        position: new THREE.Vector3(-70,40,105),
        target: new THREE.Vector3(-195,-50,-115),
    },
    [CameraModes.RESIDENCIAS]: {
        position: new THREE.Vector3(-55,45,74),
        target: new THREE.Vector3(-550,-50,-115),
    },
    [CameraModes.CASONA01]: {
        position: new THREE.Vector3(-24,50, 78),
        target: new THREE.Vector3(-165,-158,-115),
    },
    [CameraModes.CASONA02]: {
        position: new THREE.Vector3(-25,45,28),
        target: new THREE.Vector3(-292,-158,-115),
    }

}


const CameraControls = () => {
    const { cameraMode } = useCharacterCustomization()
    const orbitControls = useRef()


    // Camera Controls con Leva
    const { positionX, positionY, positionZ, targetPosX, targetPosY, targetPosZ } = useControls('cameras',{
        positionX:
        {
            value: 20,
            min:-100, 
            max: 150
        },
        positionY:
        {
            value: 180,
            min:-100, 
            max: 200
        },
        positionZ:
        {
            value: 100,
            min:-50, 
            max: 250
        },
        targetPosX:
        {
            value:-10, 
            min:-550, 
            max: 50
        },
        targetPosY:
        {
            value:0, 
            min:-200, 
            max:0
        },
        targetPosZ:
        {
            value:-115, 
            min:-200, 
            max:50
        }
    })



    useFrame((state, delta) => {
        if(cameraMode === CameraModes.BASE) {
            return
        }
        state.camera.position.lerp(cameraPositions[cameraMode].position, 2 * delta)
        orbitControls.current.target.lerp(cameraPositions[cameraMode].target, 2 * delta)

    })

    return (
        <>
            <OrbitControls 
                ref={ orbitControls }
                target={[-40, -200, -115]}
                makeDefault
            />
        
        </>
    )
}

export default CameraControls





