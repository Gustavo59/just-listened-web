const nextJest = require("next/jest");

const createJestConfig = nextJest({
    dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
    testEnvironment: "jest-environment-jsdom",
    testPathIgnorePatterns: ["node_modules", "__tests__/data", "setup.ts"],
    collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
    setupFiles: ["<rootDir>/src/__tests__/setup.ts"],
    moduleNameMapper: {
        '^swiper': require.resolve('swiper'),
    },
};

module.exports = createJestConfig(customJestConfig);