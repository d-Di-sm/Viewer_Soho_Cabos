import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { Suspense, useMemo, useState } from "react";
import * as THREE from 'three'


function Panorama({ textureUrl, opacity }) {
  const texture = useTexture(textureUrl);

  // Asegurar que las texturas JPG se traten como sRGB
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }

  return (
    <a.mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <a.meshBasicMaterial map={texture} side={2} transparent opacity={opacity} />
    </a.mesh>
  );
}

function Hotspot({ position, label, onClick }) {
  return (
    <group position={position}>
      <mesh onClick={onClick}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial color="orange" />
      </mesh>
      <Html distanceFactor={20}>
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

// 🔍 Este componente anima el zoom real del lente (FOV)
function AnimatedCamera({ isTransitioning }) {
  const { camera } = useThree();
  const { fov } = useSpring({
    from: { fov: 75 },
    to: { fov: isTransitioning ? 60 : 75 },
    config: { tension: 80, friction: 20 },
  });

  useFrame(() => {
    camera.fov = fov.get();
    camera.updateProjectionMatrix();
  });

  return null;
}





// Construye escenas dinámicas a partir de la lista de flips y la configuración de hotspots / targets / labels / folder
function buildScenesFromConfig(flips, hotspotsConfig, hotspotIndexTargets, labelsConfig, folder) {
  if (!Array.isArray(flips) || flips.length === 0) return null;

  const sceneNames = flips.map((flip) => flip.replace(/\.jpg$/i, ""));
  const scenes = {};
  
  const total = sceneNames.length;

  sceneNames.forEach((name, index) => {
    const textureFile = flips[index]; // p.ej. "B2_FLIP.jpg"


    // const nextIndex1 = (index + 1) % sceneNames.length;
    // const nextIndex2 = (index + 2) % sceneNames.length;


    // Lista de posiciones para esta escena (una por hotspot)
    const positionsForScene =
      Array.isArray(hotspotsConfig) && Array.isArray(hotspotsConfig[index])
        ? hotspotsConfig[index]
        : [[50, 0, -100], [250, 0, -100]];

    // Lista de índices de destino para esta escena (uno por hotspot)
    const indexTargetsForScene =
      Array.isArray(hotspotIndexTargets) && Array.isArray(hotspotIndexTargets[index])
        ? hotspotIndexTargets[index]
        : positionsForScene.map((_, i) => (index + i + 1) % total);

    // Lista de labels para esta escena (uno por hotspot)
    const labelsForScene =
      Array.isArray(labelsConfig) && Array.isArray(labelsConfig[index])
        ? labelsConfig[index]
        : positionsForScene.map(() => "next room");

    const hotspots = positionsForScene.map((pos, i) => {
      const rawIndexTarget = indexTargetsForScene[i];
      // Usamos directamente el índice tal como viene en hotspotIndexTargets
      const targetIdx =
        typeof rawIndexTarget === "number" ? rawIndexTarget : (index + i + 1);

      return {
        position: pos || [50, 0, -100],
        label: labelsForScene[i] || "next room",
        target: sceneNames[targetIdx],
      };
    });






    scenes[name] = {
      texture: folder
        ? `./360/${folder}/${textureFile}`
        : `./360/${textureFile}`,

      hotspots,
    };
  });

  return { scenes, initialScene: sceneNames[0] };
}









// export default function Recorrido360() {

//   const [scene, setScene] = useState("lobby")
//   const [nextScene, setNextScene] = useState(null)
//   const [isTransitioning, setIsTransitioning] = useState(false)



// export default function Recorrido360({ tourFlips }) {

export default function Recorrido360({ tourFlips, hotspots, hotspotIndexTargets, labels, folder }) {


  // const scenes = {

  // Escenas fijas de ejemplo (fallback si no se reciben flips por props)
  const staticScenes = {
    lobby: {
      texture: "./360/PANO1_L1.png",
      hotspots: [
        { position: [50, 0, -100], label: "Ir a Room 1", target: "room1" },
        { position: [250, 0, -100], label: "Ir a Room 2", target: "room2" },
    ],
    },
    room1: {
      texture: "./360/PANO2_L1.png",
      hotspots: [
        { position: [-60, 10, 80], label: "Volver al Lobby", target: "lobby" },
        { position: [-260, 10, 80], label: "Ir a Room 2", target: "room2" },
    ],
    },
    room2: {
      texture: "./360/PANO3_L1.png",
      hotspots: [
        { position: [-60, 10, 80], label: "Volver al Lobby", target: "lobby" },
        { position: [-260, 10, 80], label: "Ir a Room 1", target: "room1" },
    ],
    },
  };


  //////
  
  const dynamicConfig = useMemo(
    // () => buildScenesFromFlips(tourFlips),
    // [tourFlips]

    () => buildScenesFromConfig(tourFlips, hotspots, hotspotIndexTargets, labels, folder),
    [tourFlips, hotspots, hotspotIndexTargets, labels, folder]

  );

  const useDynamicScenes = !!dynamicConfig;

  const [scene, setScene] = useState(
    useDynamicScenes ? dynamicConfig.initialScene : "lobby"
  );
  const [nextScene, setNextScene] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const scenes = useDynamicScenes ? dynamicConfig.scenes : staticScenes;

  ////////




  const current = scenes[scene];
  const next = nextScene ? scenes[nextScene] : null;

  // 🌫️ animación de opacidad (fade)
  const { opacity } = useSpring({
    from: { opacity: 1 },
    to: { opacity: isTransitioning ? 0.6 : 1 },
    config: { duration: 800 },
    onRest: () => {
      if (isTransitioning && nextScene) {
        setScene(nextScene);
        setNextScene(null);
        setIsTransitioning(false);
      }
    },
  });

  const handleSceneChange = (target) => {
    if (target !== scene && !isTransitioning) {
      setNextScene(target);
      setIsTransitioning(true);
    }
  }




  // const handleAnnotationClick = (imageName, annotationName) => {
  //   //Dispatch custom event with image and annotation information
  //   window.dispatchEvent(new CustomEvent('annotation-click', {
  //     detail: {
  //       image: imageName,
  //       annotation: annotationName
  //     }
  //   }));
  // }





  return (
    <>
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{ fov: 75, position: [0, 0, 0.1] }}
    >
      
      <Suspense fallback={null}>
        {/* Panorama actual */}
        <Panorama textureUrl={current.texture} opacity={opacity} />

        {/* Hotspots */}
        {!isTransitioning &&
          current.hotspots.map((h, i) => (
            <Hotspot
              key={i}
              position={h.position}
              label={h.label}
              onClick={() => handleSceneChange(h.target)}
            />
          ))}

        {/* 🔍 Zoom animado */}
        <AnimatedCamera isTransitioning={isTransitioning} />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} />


    </Canvas>
    


    </>

  )
}
