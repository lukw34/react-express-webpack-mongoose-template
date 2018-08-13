module.exports = {
    browser: true,
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: true,
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform'
    },
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testURL: 'http://example.com',
    setupFiles: ['<rootDir>/jest/config.js', '<rootDir>/jest/globals.js'],
    roots: ['<rootDir>/app/client'],
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    }
};