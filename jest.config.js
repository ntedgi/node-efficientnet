module.exports = {
  verbose: true,
  testTimeout: 30000,
  transform: {
    "^.+\\.ts$": "babel-jest",
  },
  modulePathIgnorePatterns: ["<rootDir>/playground/"],
  coverageReporters: ["lcov"],
};
