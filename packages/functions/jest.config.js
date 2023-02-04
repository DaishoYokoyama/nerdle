module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["./**/?(*.)+(spec|test).+(ts)"],
  transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
};
