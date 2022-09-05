module.exports = {
    moduleDirectories: [
        'node_modules',
        'utils', // a utility folder
        __dirname, // the root directory
    ],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['./src/setupTests.js'],
}
