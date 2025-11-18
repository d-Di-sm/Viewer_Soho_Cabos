import './App.css'
import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import '@mantine/core/styles.css'

import { Leva } from 'leva'
import * as THREE from 'three'


import Experience from './components/Experience'
import Overlay from './components/Overlay'
import Interface from './components/Interface'
import Recorrido360 from './components/360/Recorrido360.jsx'
import Overlay360 from './components/360/Overlay_360.jsx'
import Interface360 from './components/360/Interface_360.jsx'


/**
 * Camara Base
 */
function LogCameraAndTarget () {
  const controls = useRef()

  return <OrbitControls ref={ controls } makeDefault />
}



function App() {

  const imageM = './Im01.png'
  const titleM = "Dept 2 BR"

  const [showRecorrido360, setShowRecorrido360] = useState(false)
  const [returnToMesh, setReturnToMesh] = useState(null)

  const handleTourClick = (meshName) => {
    setReturnToMesh(meshName)
    setShowRecorrido360(true)
  }

  const handleReturnClick = () => {
    setShowRecorrido360(false)
    // Dispatch event to reopen the floating panel after return
    if (returnToMesh) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('return-from-360', {
          detail: {
            meshName: returnToMesh
          }
        }))
      }, 100)
    }
  }

  return (
    <>
      <Leva collapsed />

      {!showRecorrido360 ? (
        <>
          <Canvas
              dpr={ [ 1, 2 ] }
              gl={ {
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  outputColorSpace: THREE.SRGBColorSpace
              }}
              camera={ {
                  fov: 45,
                  near: 1,
                  far: 500,
                  position: [ 65, 190, 200 ] 
              } }
              shadows={{
                enabled: true,
                type: "VSMShadowMap"
              }}
          >

              <LogCameraAndTarget />

              <Experience />

          </Canvas>

          <Interface />

          <Overlay onTourClick={handleTourClick} />
        </>
      ) : (
        <>
          <Recorrido360 />

          <Interface360 onReturnClick={handleReturnClick} />

          <Overlay360 panelImage={imageM} panelTitle={titleM} />

        </>
      )}
    </>
  )
}


export default App
