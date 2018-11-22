import {
    MetaDataImport,
    MetaDataExport,
    DataImport,
    DataExport,
    GMLImport,
    EventImport,
    EventExport,
    MetaDataDependencyExport,
} from 'pages'

const pages = [
    MetaDataImport,
    DataImport,
    EventImport,
    GMLImport,
    MetaDataExport,
    DataExport,
    EventExport,
    MetaDataDependencyExport,
]

const list = pages.map(p => ({
    path: p.path,
    order: p.order,
    menuIcon: p.menuIcon,
    title: p.title,
    description: p.desc,
}))

export default list

// export default [
//     {
//         title: i18n.t('Metadata Export'),
//         description: i18n.t(
//             'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
//         ),
//     },
//     {
//         title: i18n.t('Data Export'),
//         description: i18n.t(
//             'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.'
//         ),
//     },
//     {
//         title: i18n.t('Event Export'),
//         description: i18n.t(
//             'Export event data for programs, stages and tracked entities in the DXF 2 format.'
//         ),
//     },
//     {
//         title: i18n.t('Metadata Dependency Export'),
//         description: i18n.t(
//             'Export metadata like data sets and programs including related metadata objects.'
//         ),
//     },
// ]
