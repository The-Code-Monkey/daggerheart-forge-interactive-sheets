import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { JSX, useRef, useState } from "react";
import Dice, { DiceHandle } from "./Dice";
import UI from "./UI";
import Boundaries from "./Boundaries";
import { OrbitControls } from "@react-three/drei";

const DiceRoller = (): JSX.Element => {
  const [diceConfig, setDiceConfig] = useState<
    { type: string; color: string }[]
  >([]);

  const diceRefs = useRef<DiceHandle[]>([]);

  const rollAllDice = () => {
    console.log(diceRefs.current);
    diceRefs.current.forEach((ref) => {
      ref.roll();
    });
  };

  console.log(diceConfig, "HERE");

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <UI setDiceConfig={setDiceConfig} onRoll={rollAllDice} />
      </div>
      <Canvas
        className="bg-black aspect-square col-span-2"
        shadows
        camera={{ position: [0, 100, 0], fov: 20 }}
      >
        <OrbitControls />
        <ambientLight intensity={2} />
        <directionalLight
          position={[0, 1, 0]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Physics>
          <Boundaries />
          {diceConfig.map((d, i) => (
            <Dice
              key={i}
              ref={(el) => {
                diceRefs.current[i] = el!;
              }}
              type={d.type}
              color={d.color}
              position={[
                (Math.random() - 0.5) * 2,
                3,
                (Math.random() - 0.5) * 2,
              ]}
            />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
};

export default DiceRoller;
