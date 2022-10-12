module.exports = {
  verbose: true,
  testTimeout: 1000000,
  transform: {
    "^.+\\.ts$": "babel-jest",
  },
  modulePathIgnorePatterns: ["<rootDir>/playground/"],
  coverageReporters: ["text", "cobertura"],
};
