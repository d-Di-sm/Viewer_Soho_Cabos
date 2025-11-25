import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useHelper, Center, Html } from '@react-three/drei'

import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import CameraControls from "./CameraControls.jsx"
import Background from "./Background.jsx"

import Terrain from './Building/Terrain.jsx'
import Amenities from './Building/Amenities.jsx'
import Residencial01 from './Building/Residencial01.jsx'
import Residencial02 from './Building/Residencial02.jsx'
import Residencial03 from './Building/Residencial03.jsx'
import Basamento from './Building/Basamento.jsx'
import Vegetacion from './Vegetacion/Vegetacion.jsx'

import Casona01 from './Building/Casona01.jsx'
import Casona02 from './Building/Casona02.jsx'
import Casona03 from './Building/Casona03.jsx'
import Casona04 from './Building/Casona04.jsx'


import { CameraModes, useCharacterCustomization } from '../contexts/CustomizationContext.jsx'

import { useThree } from '@react-three/fiber'
import ResidencialAreas from './Building/Residencial_Areas.jsx'
import { EffectComposer } from '@react-three/postprocessing'
import TerrenoLineasMultiples from '../Curves.jsx'



const Experience = () => {
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1 )

    const { isAnnotationVisible, isFloatingPanelActive, cameraMode } = useCharacterCustomization()


    /**
     * Animations
     */

    // useFrame((state, delta) =>
    // {
    //     // const angle = state.clock.elapsedTime
    //     // state.camera.position.x = Math.sin(angle) * 8
    //     // state.camera.position.z = Math.cos(angle) * 8
    //     // state.camera.lookAt(0,0,0) 

    //     cubeRef.current.rotation.y += delta
    // })


    /**
     * Leva controls
     */

    const { perfVisible } = useControls('Perf', {
        perfVisible: true
    })

    const { position, color, visible, choice, envMapIntensity, positionX, positionY, positionZ } = useControls('performance',{
        position:
        {
            value: { x: 0, y: 0 },
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#ff0000',
        visible: true,
        choice: { options: [ "a", "b", "c" ] },
        envMapIntensity:
            {
                value:1, 
                min:0, 
                max: 12
            },
        positionX:
            {
                value: 0,
                min:-140,
                max:100
            },
        positionY:
            {
                value:20,
                min: -50,
                max: 70
            },
        positionZ:
            {
                value:-120,
                min: -200,
                max: 100
            }

    })


    const handleAnnotationClick = (imageName, annotationName, meshName = null) => {
        //Dispatch custom event with image and annotation information
        window.dispatchEvent(new CustomEvent('annotation-click', {
            detail: {
                image: imageName,
                annotation: annotationName,
                meshName: meshName
            }
        }));
    }




    return (
        <>
        
        {/* Leva button Perf */}
        { perfVisible ? <Perf position="top-left"/> : null }

        <CameraControls />

        <Background />


        <directionalLight 
            castShadow 
            ref={ directionalLight } 
            position={ [ 10, 10, 15 ] } 
            intensity={ 2.5 }
            shadow-mapSize={ [ 4096, 4096 ] }
            shadow-bias={ -0.005 }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 1200 }
            shadow-camera-left={ -100 }
            shadow-camera-right={ 100 }
            shadow-camera-top={ 100 }
            shadow-camera-bottom={ -100 } 
        />
        {/* <ambientLight intensity={ 1.5 } /> */}


        {/* Modelos */}

        <Terrain />

        <Residencial01 />

        <Residencial02 />        
        <Residencial02  rotation={[0, (Math.PI/180) * 9, 0]} position={[34.37, 0, 18.19]} />
        <Residencial02  rotation={[0, (Math.PI/180) * 15, 0]} position={[71.75, 0, 31.10]}/>
        <Residencial02  rotation={[0, (Math.PI/180) * 32, 0]} position={[110.58, 0, 34.13]}/>

        <Residencial03 />

        <Amenities />

        <Casona01 />
        <Casona02 />

        <Casona03 />
        <Casona04 />
        <Casona04 position={[-50.10, 0.15, -16.18]}/>

        <Basamento />

        <Vegetacion />

        <ResidencialAreas />


        <mesh receiveShadow position={[ -7.5, 0, 15 ]} rotation-x={ - Math.PI * 0.5 } scale={ 50 }>
            <planeGeometry />
            <meshStandardMaterial color="#ffffe5" />
        </mesh>


        <TerrenoLineasMultiples />






        {/* ------------------ */}
        {/* Annotation Points */}

        {isAnnotationVisible("AMENIDADES_AEREO") && (
            <Annotation_3d nombre="AMENIDADES" rotation={[0, -Math.PI * .4, 0]} position={[-95, 30, 65]} onAnnotationClick={() => handleAnnotationClick("Im01.png", "AMENIDADES")} />
        )}

        {isAnnotationVisible("RESIDENCIAS01") && (
            <Annotation_3d nombre="RESIDENCIAS01" rotation={[0, -Math.PI * .4, 0]} position={[-110, 34, 50]} onAnnotationClick={() => handleAnnotationClick("Im02.png", "RESIDENCIAS01")} />
        )}

        {isAnnotationVisible("RESIDENCIAS02") && (
            <Annotation_3d nombre="RESIDENCIAS02" rotation={[0, -Math.PI * .4, 0]} position={[-3, 30, 25]} onAnnotationClick={() => handleAnnotationClick("Im05.png", "RESIDENCIAS02")} />
        )}

        {isAnnotationVisible("CASONA_01") && (
            <Annotation_3d nombre="CASONA01" rotation={[0, -Math.PI * .4, 0]} position={[-50, 26, 51]} onAnnotationClick={() => handleAnnotationClick("Im03.png", "CASONA01")} />
        )}

        {isAnnotationVisible("CASONA_02") && (
            <Annotation_3d nombre="CASONA02" rotation={[0, -Math.PI * .4, 0]} position={[-58, 30, 16]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "CASONA02")} />
        )}

        {isAnnotationVisible("ACCESO") && (
            <Annotation_3d nombre="ACCESO" rotation={[0, -Math.PI * .4, 0]} position={[-161, 35, 19]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "ACCESO")} />
        )}

        {isAnnotationVisible("CASONA03") && (
            <Annotation_3d nombre="CASONA03" rotation={[0, -Math.PI * .4, 0]} position={[-5, 24, 59]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "CASONA03")} />
        )}

        {isAnnotationVisible("CASONA04") && (
            <Annotation_3d nombre="CASONA04" rotation={[0, -Math.PI * .4, 0]} position={[79, 22, 85]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "CASONA04")} />
        )}

        {cameraMode === CameraModes.AMENIDADES && (
            <>
            <Annotation_3d nombre="ALBERCA" rotation={[0, -Math.PI * .4, 0]} position={[-92, 30, 66]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "ALBERCA")} />

            <Annotation_3d nombre="CASA CLUB" rotation={[0, -Math.PI * .4, 0]} position={[-85, 25, 75]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "CASA CLUB")} />

            <Annotation_3d nombre="ASOLEADEROS" rotation={[0, -Math.PI * .4, 0]} position={[-78, 25, 68]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "ASOLEADEROS")} />
            
            </>
        )}

        {cameraMode === CameraModes.RESIDENCIAS && (
            <>
            <Annotation_3d nombre="TERRAZA01" rotation={[0, -Math.PI * .4, 0]} position={[-112, 32, 73]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "TERRAZA01")} />

            <Annotation_3d nombre="TERRAZA02" rotation={[0, -Math.PI * .4, 0]} position={[-90, 34, 30]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "TERRAZA02")} />

            <Annotation_3d nombre="CASA CLUB" rotation={[0, -Math.PI * .4, 0]} position={[-89, 32, 42]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "CASA CLUB")} />
            
            </>
        )}

        {cameraMode === CameraModes.CASONA01 && (
            <>
            <Annotation_3d nombre="ALBERCA" rotation={[0, -Math.PI * .4, 0]} position={[-47, 24, 55]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "ALBERCA")} />

            <Annotation_3d nombre="POOL HOUSE" rotation={[0, -Math.PI * .4, 0]} position={[-55, 25, 48]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "POOL HOUSE")} />

            <Annotation_3d nombre="TERRAZA" rotation={[0, -Math.PI * .4, 0]} position={[-60, 27, 55]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "TERRAZA")} />
            
            <Annotation_3d nombre="MAIN HOUSE" rotation={[0, -Math.PI * .4, 0]} position={[-37, 25, 42]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "MAIN HOUSE")} />

            </>
        )}

        {cameraMode === CameraModes.CASONA02 && (
            <>
            <Annotation_3d nombre="ALBERCA" rotation={[0, -Math.PI * .4, 0]} position={[-57, 28, 21]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "ALBERCA")} />

            <Annotation_3d nombre="POOL HOUSE" rotation={[0, -Math.PI * .4, 0]} position={[-55, 29, 11]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "POOL HOUSE")} />

            <Annotation_3d nombre="TERRAZA" rotation={[0, -Math.PI * .4, 0]} position={[-47, 30.5, 17]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "TERRAZA")} />

            <Annotation_3d nombre="MAIN HOUSE" rotation={[0, -Math.PI * .4, 0]} position={[-74, 31.5, 15]} onAnnotationClick={() => handleAnnotationClick("Im04.png", "MAIN HOUSE")} />
            
            </>
        )}

        </>
    )
}




const Annotation_3d = ({children, nombre, position, onAnnotationClick, ...props}) => {

    const [ hovered, setHovered ] = useState(false);
    const ref = useRef()
    const { camera } = useThree();

    // Prueba
    const { cameraMode, isFloatingPanelActive } = useCharacterCustomization();

    useFrame(() => {
        if (ref.current) {
            ref.current.lookAt(camera.position)
        }
    })

    const handleClick = () => {
        if (onAnnotationClick) {
            onAnnotationClick();
        }
    }

    // Check if we're in one of the specific camera modes
    const isInViewMode = [
        CameraModes.AMENIDADES, 
        CameraModes.RESIDENCIAS, 
        CameraModes.CASONA01, 
        CameraModes.CASONA02
    ].includes(cameraMode);

    // Don't render if floating panel is active
    useEffect(() => {
        if (isFloatingPanelActive) {
            setHovered(false)
    }
    }, [isFloatingPanelActive])


    if (isFloatingPanelActive) {
        return null   
    }

    return(
        <>
        
        <group ref = {ref} position={position} {...props}>
            <Html transform position={[0,0,0]}>
                <button

                className={isInViewMode ? "circle-button-views" : "circle-button"}


                onClick={handleClick}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                />
            </Html>

            {/* {showPopup && (
                <Html transform position={[0.2, 0.1, 0]}>
                    <div className="panel-3d">
                        <button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
                        
                    </div>
                </Html>
            )} */}

        </group>

            
            
        {hovered && (
            <Html transform={false} position={[position[0] + 0.05, position[1] + 0.1, position[2]]}>
                <div className="tooltip-3d">{nombre}</div>
            </Html>
        )}



        </>
    )
}




export default Experience





