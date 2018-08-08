module.exports = {
    browser: true,
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: true,
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/node_modules/jest-css-modules-transform"
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testURL: 'http://example.com',
    setupFiles: ['<rootDir>/jest/config.js', '<rootDir>/jest/globals.js'],
    roots: ['<rootDir>/app/'],
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**'
    ],
    "moduleNameMapper": {
        "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/__mocks__/StaticImageStub"
    }
};