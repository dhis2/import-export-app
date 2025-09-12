/** @type {import('@dhis2/cli-app-scripts').D2Config} */
const config = {
    id: '275afdce-16d2-40e1-8a9b-5b22d882ed74',
    type: 'app',
    name: 'import-export',
    title: 'Import/Export',
    description: 'Core app for importing and exporting data to and from DHIS2.',
    coreApp: true,
    minDHIS2Version: '2.41',
    entryPoints: {
        app: './src/App.jsx',
    },
    shortcuts: [
        {
            name: 'Data import',
            url: '#/import/data',
        },
        {
            name: 'Data export',
            url: '#/export/data',
        },
        {
            name: 'Metadata import',
            url: '#/import/metadata',
        },
        {
            name: 'Metadata export	',
            url: '#/export/metadata',
        },
    ],
}

module.exports = config
