import * as THREE from "three";

const PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio

export const DIE_FACE_DATA: Record<
  string,
  { normal: THREE.Vector3; value: number }[]
> = {
  d4: [
    // Tetrahedron: 4 faces
    { normal: new THREE.Vector3(0, -1, 0), value: 1 },
    { normal: new THREE.Vector3(Math.sqrt(8 / 9), 1 / 3, 0), value: 2 },
    {
      normal: new THREE.Vector3(-Math.sqrt(2 / 9), 1 / 3, Math.sqrt(2 / 3)),
      value: 3,
    },
    {
      normal: new THREE.Vector3(-Math.sqrt(2 / 9), 1 / 3, -Math.sqrt(2 / 3)),
      value: 4,
    },
  ],
  d6: [
    // Cube: 6 faces
    { normal: new THREE.Vector3(0, 1, 0), value: 6 },
    { normal: new THREE.Vector3(0, -1, 0), value: 1 },
    { normal: new THREE.Vector3(1, 0, 0), value: 3 },
    { normal: new THREE.Vector3(-1, 0, 0), value: 4 },
    { normal: new THREE.Vector3(0, 0, 1), value: 2 },
    { normal: new THREE.Vector3(0, 0, -1), value: 5 },
  ],
  d8: [
    // Octahedron: 8 faces (triangular)
    { normal: new THREE.Vector3(1, 0, 0), value: 1 },
    { normal: new THREE.Vector3(-1, 0, 0), value: 2 },
    { normal: new THREE.Vector3(0, 1, 0), value: 3 },
    { normal: new THREE.Vector3(0, -1, 0), value: 4 },
    { normal: new THREE.Vector3(0, 0, 1), value: 5 },
    { normal: new THREE.Vector3(0, 0, -1), value: 6 },
    { normal: new THREE.Vector3(1, 1, 1).normalize(), value: 7 },
    { normal: new THREE.Vector3(-1, -1, -1).normalize(), value: 8 },
  ],
  d10: [
    // Pentagonal trapezohedron: 10 faces.
    // Approximate, faces arranged radially + top/bottom
    { normal: new THREE.Vector3(0, 1, 0), value: 1 },
    {
      normal: new THREE.Vector3(
        Math.sin((2 * Math.PI * 1) / 10),
        0,
        Math.cos((2 * Math.PI * 1) / 10)
      ),
      value: 2,
    },
    {
      normal: new THREE.Vector3(
        Math.sin((2 * Math.PI * 2) / 10),
        0,
        Math.cos((2 * Math.PI * 2) / 10)
      ),
      value: 3,
    },
    {
      normal: new THREE.Vector3(
        Math.sin((2 * Math.PI * 3) / 10),
        0,
        Math.cos((2 * Math.PI * 3) / 10)
      ),
      value: 4,
    },
    {
      normal: new THREE.Vector3(
        Math.sin((2 * Math.PI * 4) / 10),
        0,
        Math.cos((2 * Math.PI * 4) / 10)
      ),
      value: 5,
    },
    { normal: new THREE.Vector3(0, -1, 0), value: 6 },
    {
      normal: new THREE.Vector3(
        Math.sin((2 * Math.PI * 5) / 10),
        0,
        Math.cos((2 * Math.PI * 5) / 10)
      ),
      value: 7,
    },
    {
      normal: new THREE.Vector3(
        Math.sin((2 * Math.PI * 6) / 10),
        0,
        Math.cos((2 * Math.PI * 6) / 10)
      ),
      value: 8,
    },
    {
      normal: new THREE.Vector3(
        Math.sin((2 * Math.PI * 7) / 10),
        0,
        Math.cos((2 * Math.PI * 7) / 10)
      ),
      value: 9,
    },
    {
      normal: new THREE.Vector3(
        Math.sin((2 * Math.PI * 8) / 10),
        0,
        Math.cos((2 * Math.PI * 8) / 10)
      ),
      value: 10,
    },
  ],
  d12: [
    // Dodecahedron: 12 faces (pentagonal)
    // Using golden ratio PHI and normalized
    { normal: new THREE.Vector3(0, 1, PHI).normalize(), value: 1 },
    { normal: new THREE.Vector3(0, 1, -PHI).normalize(), value: 2 },
    { normal: new THREE.Vector3(0, -1, PHI).normalize(), value: 3 },
    { normal: new THREE.Vector3(0, -1, -PHI).normalize(), value: 4 },
    { normal: new THREE.Vector3(1, PHI, 0).normalize(), value: 5 },
    { normal: new THREE.Vector3(1, -PHI, 0).normalize(), value: 6 },
    { normal: new THREE.Vector3(-1, PHI, 0).normalize(), value: 7 },
    { normal: new THREE.Vector3(-1, -PHI, 0).normalize(), value: 8 },
    { normal: new THREE.Vector3(PHI, 0, 1).normalize(), value: 9 },
    { normal: new THREE.Vector3(-PHI, 0, 1).normalize(), value: 10 },
    { normal: new THREE.Vector3(PHI, 0, -1).normalize(), value: 11 },
    { normal: new THREE.Vector3(-PHI, 0, -1).normalize(), value: 12 },
  ],
  d20: [
    // Icosahedron: 20 faces (triangular)
    // Precalculated approximate normals for each face, normalized
    { normal: new THREE.Vector3(0, PHI, 1).normalize(), value: 1 },
    { normal: new THREE.Vector3(0, PHI, -1).normalize(), value: 2 },
    { normal: new THREE.Vector3(0, -PHI, 1).normalize(), value: 3 },
    { normal: new THREE.Vector3(0, -PHI, -1).normalize(), value: 4 },
    { normal: new THREE.Vector3(1, 0, PHI).normalize(), value: 5 },
    { normal: new THREE.Vector3(1, 0, -PHI).normalize(), value: 6 },
    { normal: new THREE.Vector3(-1, 0, PHI).normalize(), value: 7 },
    { normal: new THREE.Vector3(-1, 0, -PHI).normalize(), value: 8 },
    { normal: new THREE.Vector3(PHI, 1, 0).normalize(), value: 9 },
    { normal: new THREE.Vector3(PHI, -1, 0).normalize(), value: 10 },
    { normal: new THREE.Vector3(-PHI, 1, 0).normalize(), value: 11 },
    { normal: new THREE.Vector3(-PHI, -1, 0).normalize(), value: 12 },
    { normal: new THREE.Vector3(1, PHI, 0).normalize(), value: 13 },
    { normal: new THREE.Vector3(1, -PHI, 0).normalize(), value: 14 },
    { normal: new THREE.Vector3(-1, PHI, 0).normalize(), value: 15 },
    { normal: new THREE.Vector3(-1, -PHI, 0).normalize(), value: 16 },
    { normal: new THREE.Vector3(PHI, 0, 1).normalize(), value: 17 },
    { normal: new THREE.Vector3(PHI, 0, -1).normalize(), value: 18 },
    { normal: new THREE.Vector3(-PHI, 0, 1).normalize(), value: 19 },
    { normal: new THREE.Vector3(-PHI, 0, -1).normalize(), value: 20 },
  ],
};

export const getFaceUp = (
  dieType: string,
  quaternion: THREE.Quaternion
): number | null => {
  const faceData = DIE_FACE_DATA[dieType];

  const up = new THREE.Vector3(0, 1, 0);

  let maxDot = -Infinity;
  let faceValue: number | null = null;

  for (const face of faceData) {
    const worldNormal = face.normal.clone().applyQuaternion(quaternion);
    const dot = worldNormal.dot(up);
    if (dot > maxDot) {
      maxDot = dot;
      faceValue = face.value;
    }
  }
  return faceValue;
};
