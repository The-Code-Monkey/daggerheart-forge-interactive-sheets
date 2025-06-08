import { useBox, useConvexPolyhedron } from "@react-three/cannon";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { getFaceUp } from "./helpers";
import * as THREE from "three";

const DIE_GEOMETRIES: Record<
  string,
  {
    vertices: [number, number, number][];
    faces: number[][];
  }
> = {
  d4: {
    vertices: [
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ],
    faces: [
      [0, 1, 2],
      [0, 3, 1],
      [0, 2, 3],
      [1, 3, 2],
    ],
  },
  d6: {
    vertices: [
      [-1, -1, -1],
      [-1, -1, 1],
      [-1, 1, -1],
      [-1, 1, 1],
      [1, -1, -1],
      [1, -1, 1],
      [1, 1, -1],
      [1, 1, 1],
    ],
    faces: [
      [0, 2, 6],
      [0, 6, 4],
      [0, 4, 5],
      [0, 5, 1],
      [0, 1, 3],
      [0, 3, 2],
      [7, 6, 2],
      [7, 2, 3],
      [7, 3, 1],
      [7, 1, 5],
      [7, 5, 4],
      [7, 4, 6],
    ],
  },
  d8: {
    vertices: [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ],
    faces: [
      [0, 2, 4],
      [2, 1, 4],
      [1, 3, 4],
      [3, 0, 4],
      [0, 5, 2],
      [2, 5, 1],
      [1, 5, 3],
      [3, 5, 0],
    ],
  },
};

export interface DiceHandle {
  roll: () => void;
}

interface DiceProps {
  type: string;
  color: string;
  position: [number, number, number];
}

const Dice = forwardRef<DiceHandle, DiceProps>(
  ({ type, color, position }, ref) => {
    // Determine collision shape args for physics based on die type
    // For simplicity, use approx bounding box size for each die type
    // These args control the physics body size for useBox
    const gltf = useGLTF(`/public/models/${type}.glb`);

    const [settled, setSettled] = useState(false);
    const velocity = useRef([0, 0, 0]);
    const angular = useRef([0, 0, 0]);

    const { vertices, faces } = DIE_GEOMETRIES[type];

    const [diceRef, api] = useConvexPolyhedron(() => ({
      mass: 1,
      position,
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ],
      args: [vertices, faces],
      material: { restitution: 0.4, friction: 0.02 },
    }));

    useImperativeHandle(ref, () => ({
      roll: () => {
        setSettled(false);

        // Reset position slightly above the ground
        api.position.set(position[0], position[1], position[2]);
        api.velocity.set(0, 0, 0);
        api.angularVelocity.set(0, 0, 0);

        const negative = Math.random() < 0.5 ? -1 : 1;
        const negative2 = Math.random() < 0.5 ? -1 : 1;
        const negative3 = Math.random() < 0.5 ? -1 : 1;

        api.applyImpulse(
          [
            (Math.random() - 0.5) * 2 +
              4 * Math.random() * 4 * (negative3 === -1 ? negative : negative2),
            4,
            (Math.random() - 0.5) * 5 +
              4 * Math.random() * 4 * (negative2 === -1 ? negative : negative3),
          ],
          [0, 0, 0],
        );
        api.applyTorque([
          (Math.random() - 0.5) * 50 +
            4 * Math.random() * (negative3 === -1 ? negative3 : negative2) * 50,
          (Math.random() - 0.5) * 50 +
            4 * Math.random() * 50 * (negative2 === -1 ? negative2 : negative3),
          (Math.random() - 0.5) * 50 +
            4 * Math.random() * (negative === -1 ? negative : negative2) * 50,
        ]);
      },
    }));

    useEffect(() => {
      const unsubVel = api.velocity.subscribe((v) => (velocity.current = v));
      const unsubAng = api.angularVelocity.subscribe(
        (a) => (angular.current = a),
      );
      return () => {
        unsubVel();
        unsubAng();
      };
    }, []);

    useFrame(() => {
      const speed = Math.hypot(...velocity.current);
      const spin = Math.hypot(...angular.current);
      if (!settled && speed < 0.05 && spin < 0.05) {
        setSettled(true);
        // TODO: compute result from face-up direction
        //
        if (diceRef.current) {
          const quat = new THREE.Quaternion();
          diceRef.current.getWorldQuaternion(quat);

          const result = getFaceUp(type, quat);
          console.log(`Dice result for ${type}:`, result);
        }
      }
    });

    console.log(gltf);

    return (
      <group castShadow receiveShadow scale={[1, 1, 1]}>
        <primitive object={gltf.scene} ref={diceRef}>
          <meshStandardMaterial color={color} />
        </primitive>
      </group>
    );
  },
);

export default Dice;
