/** @format */

module.exports = {
    plugins: ['jest', 'import'],
    extends: ['react-app', 'prettier'],
    rules: {
        'no-console': 'off',
    },
    env: {
        jest: true,
    },
}
