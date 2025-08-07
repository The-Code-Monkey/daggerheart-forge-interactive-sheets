module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
      },
    ],
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@supabase|@marsidev/react-turnstile)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx,js}",
    "<rootDir>/src/**/?(*.)+(spec|test).{ts,tsx,js}",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  // Snapshot serializer options
  snapshotSerializers: [],
  // Update snapshots automatically in CI
  updateSnapshot: process.env.CI ? false : true,
  // Handle ES modules
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
