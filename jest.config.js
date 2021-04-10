module.exports = {
  preset: "ts-jest",
  verbose: true,
  testTimeout: 30000,
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/playground/"],
};
