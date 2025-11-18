import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { Suspense, useState } from "react";


function Panorama({ textureUrl, opacity }) {
  const texture = useTexture(textureUrl);
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

export default function Recorrido360() {

  const [scene, setScene] = useState("lobby")
  const [nextScene, setNextScene] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const scenes = {
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
    <Canvas camera={{ fov: 75, position: [0, 0, 0.1] }}>
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
