module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  setupFiles: ["dotenv/config"],
  testPathIgnorePatterns: ["/node_modules/"],
};
