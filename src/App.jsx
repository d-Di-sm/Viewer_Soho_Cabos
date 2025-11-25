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


const tourMappings = {
  '2BR_G': {
    folder: '2BR',
    image: './Im01.png',
    title: '2 BR Garden',
    flips: ['B2_FLIP.jpg', 'BA01_FLIP.jpg', 'BA02_FLIP.jpg', 'LI_FLIP.jpg', 'LO_FLIP.jpg', 'MA_FLIP.jpg', 'TE_FLIP.jpg'],
    hotspots: [
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
    ],
    hotspotIndexTargets: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
    labels: [
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
    ]
  },
  '2BR': {
    folder: '2BR',
    image: './Im02.png',
    title: '2 BR',
    flips: ['B2_FLIP.jpg', 'BA01_FLIP.jpg', 'BA02_FLIP.jpg', 'LI_FLIP.jpg', 'LO_FLIP.jpg', 'MA_FLIP.jpg', 'TE_FLIP.jpg'],
    hotspots: [
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
    ],
    hotspotIndexTargets: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
    labels: [
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
    ]
  },
  '3BR_G': {
    folder: '3BR',
    image: './Im03.png',
    title: '3 BR Garden',
    flips: ['B2_FLIP.jpg', 'BA01_FLIP.jpg', 'BA02_FLIP.jpg', 'LI_FLIP.jpg', 'LO_FLIP.jpg', 'MA_FLIP.jpg', 'TE_FLIP.jpg'],
    hotspots: [
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
    ],
    hotspotIndexTargets: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
    labels: [
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
    ]
  },
  '3BR': {
    folder: '3BR',
    image: './Im04.png',
    title: '3 BR',
    flips: ['B2_FLIP.jpg', 'BA01_FLIP.jpg', 'BA02_FLIP.jpg', 'LI_FLIP.jpg', 'LO_FLIP.jpg', 'MA_FLIP.jpg', 'TE_FLIP.jpg'],
    hotspots: [
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
    ],
    hotspotIndexTargets: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
    labels: [
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
    ]
  },
  '4BR_T': {
    folder: '2BR',
    image: './Im05.png',
    title: '4 BR Terrace',
    flips: ['B2_FLIP.jpg', 'BA01_FLIP.jpg', 'BA02_FLIP.jpg', 'LI_FLIP.jpg', 'LO_FLIP.jpg', 'MA_FLIP.jpg', 'TE_FLIP.jpg'],
    hotspots: [
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
    ],
    hotspotIndexTargets: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
    labels: [
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
    ]
  },
  '4BR': {
    folder: '2BR',
    image: './Im05.png',
    title: '4 BR',
    flips: ['B2_FLIP.jpg', 'BA01_FLIP.jpg', 'BA02_FLIP.jpg', 'LI_FLIP.jpg', 'LO_FLIP.jpg', 'MA_FLIP.jpg', 'TE_FLIP.jpg'],
    hotspots: [
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
      [[50, 0, -100], [250, 0, -100]],
    ],
    hotspotIndexTargets: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
    labels: [
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
      ['target01', 'target02'],
    ]
  }
}






/**
 * Camara Base
 */
function LogCameraAndTarget () {
  const controls = useRef()

  return <OrbitControls ref={ controls } makeDefault />
}



function App() {

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
          {/* <Recorrido360 /> */}
          <Recorrido360
            tourFlips={returnToMesh && tourMappings[returnToMesh] ? tourMappings[returnToMesh].flips : undefined}
            hotspots={returnToMesh && tourMappings[returnToMesh] ? tourMappings[returnToMesh].hotspots : undefined}
            hotspotIndexTargets={returnToMesh && tourMappings[returnToMesh] ? tourMappings[returnToMesh].hotspotIndexTargets : undefined}
            labels={returnToMesh && tourMappings[returnToMesh] ? tourMappings[returnToMesh].labels : undefined}
            folder={returnToMesh && tourMappings[returnToMesh] ? tourMappings[returnToMesh].folder : undefined}
          />

          <Interface360 onReturnClick={handleReturnClick} />

          {/* <Overlay360 panelImage={imageM} panelTitle={titleM} /> */}
          <Overlay360
            panelImage={returnToMesh && tourMappings[returnToMesh] ? tourMappings[returnToMesh].image : undefined}
            panelTitle={returnToMesh && tourMappings[returnToMesh] ? tourMappings[returnToMesh].title : undefined}
          />

        </>
      )}
    </>
  )
}


export default App
