// jest.config.js
// Sync object
module.exports = {
  verbose: true,
  testTimeout: 30000,
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  modulePathIgnorePatterns: ["<rootDir>/playground/"],
};
