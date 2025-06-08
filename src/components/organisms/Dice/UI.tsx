import { JSX, useEffect, useState } from "react";

const DICE_TYPES = [
  { label: "d4", color: "gray" },
  { label: "d6", color: "gray" },
  { label: "d8", color: "gray" },
  { label: "d10", color: "gray" },
  { label: "d12", color: "gray" },
  { label: "d20", color: "gray" },
];

const UI = ({
  setDiceConfig,
  onRoll,
}: {
  setDiceConfig: (dice: { type: string; color: string }[]) => void;
  onRoll: () => void;
}): JSX.Element => {
  const [diceCounts, setDiceCounts] = useState(
    DICE_TYPES.reduce((acc, die) => ({ ...acc, [die.label]: 0 }), {})
  );

  useEffect(() => {
    setDiceConfig(
      Object.entries(diceCounts).flatMap(([type, count]) =>
        Array.from({ length: count }, () => ({
          type,
          color:
            type === "d6"
              ? "blue"
              : type === "d8"
                ? "green"
                : type === "d10"
                  ? "purple"
                  : type === "d4"
                    ? "orange"
                    : type === "d12"
                      ? "red"
                      : type === "d20"
                        ? "gold"
                        : "gray",
        }))
      )
    );
  }, [diceCounts]);

  // Single toggle for both Hope and Fear dice
  const [hopeFearEnabled, setHopeFearEnabled] = useState(false);

  const increment = (label: string) => {
    setDiceCounts((prev) => ({
      ...prev,
      [label]: prev[label] + 1,
    }));
  };

  const decrement = (label: string) => {
    setDiceCounts((prev) => ({
      ...prev,
      [label]: Math.max(0, prev[label] - 1),
    }));
  };

  const handleRoll = () => {
    // const dice: { type: string; color: string }[] = [];

    // for (const die of DICE_TYPES) {
    //   const count = diceCounts[die.label];
    //   for (let i = 0; i < count; i++) {
    //     dice.push({ type: die.label, color: die.color });
    //   }
    // }

    // if (hopeFearEnabled) {
    //   // Add one yellow and one red d12
    //   dice.push({ type: "hope", color: "yellow" });
    //   dice.push({ type: "fear", color: "red" });
    // }
    //
    onRoll();
  };

  return (
    <div className="text-white bg-brand-800 p-4 rounded-md shadow-md">
      <h3>Select dice to roll</h3>
      {DICE_TYPES.map(({ label }) => (
        <div
          key={label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            alignItems: "center",
          }}
        >
          <span>{label}</span>
          <div>
            <button
              onClick={() => {
                decrement(label);
              }}
              style={{ marginRight: 6, padding: "2px 6px" }}
            >
              -
            </button>
            <span>{diceCounts[label]}</span>
            <button
              onClick={() => {
                increment(label);
              }}
              style={{ marginLeft: 6, padding: "2px 6px" }}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <hr style={{ margin: "12px 0", borderColor: "#333" }} />

      <button
        onClick={() => {
          setHopeFearEnabled((v) => !v);
        }}
        style={{
          width: "100%",
          padding: "8px 0",
          background: hopeFearEnabled ? "orange" : "#444",
          color: hopeFearEnabled ? "black" : "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        {hopeFearEnabled ? "Remove Hope & Fear Dice" : "Add Hope & Fear Dice"}
      </button>

      <button
        onClick={handleRoll}
        style={{
          width: "100%",
          padding: "8px 0",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Roll Dice
      </button>
    </div>
  );
};

export default UI;
