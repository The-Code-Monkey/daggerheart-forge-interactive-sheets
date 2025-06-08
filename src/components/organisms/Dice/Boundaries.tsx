import { useBox, usePlane } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const WallMesh = ({ position, args }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      const helper = new THREE.BoxHelper(meshRef.current);
      meshRef.current.add(helper);
      return () => meshRef.current.remove(helper);
    }
  }, []);

  return (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const Boundaries = () => {
  const wallThickness = 100; // thickness of the walls
  const areaSize = 100; // half the width/length of play area

  // Left wall
  useBox(() => ({
    args: [1, 5, 20], // width, height, depth
    position: [9, 2.5, 0],
    type: "Static",
  }));

  // Right wall
  useBox(() => ({
    args: [1, 5, 20],
    position: [-9, 2.5, 0],
    type: "Static",
  }));

  // Front wall
  useBox(() => ({
    args: [20, 5, 1],
    position: [0, 2.5, 9],
    type: "Static",
  }));

  // Back wall
  useBox(() => ({
    args: [20, 5, 1],
    position: [0, 2.5, -9],
    type: "Static",
  }));

  usePlane(() => ({
    type: "Static",
    position: [0, 1, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <>
      {/* Left Wall */}
      <WallMesh position={[9, 2.5, 0]} args={[1, 5, 20]} />
      {/* Right Wall */}
      <WallMesh position={[-9, 2.5, 0]} args={[1, 5, 20]} />
      {/* Front Wall */}
      <WallMesh position={[0, 2.5, 9]} args={[20, 5, 1]} />
      {/* Back Wall */}
      <WallMesh position={[0, 2.5, -9]} args={[20, 5, 1]} />
      {/* Floor */}
      <WallMesh position={[0, 0, 0]} args={[20, 0, 20]} />
    </>
  );
};

export default Boundaries;
