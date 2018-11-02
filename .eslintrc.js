/** @format */

module.exports = {
    extends: ['react-app', 'prettier'],
    rules: {
        'no-console': 'off',
    },
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true,
        },
    }
}
