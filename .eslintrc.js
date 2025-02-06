const { config } = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact],
    overrides: [
        {
            files: ['*.test.jsx', '*.test.js'],
            rules: {
                'import/no-unresolved': 0,
                'import/order': 0,
            },
        },
    ],
}
