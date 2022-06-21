import i18n from '@dhis2/d2-i18n'
// export pages
import {
    PAGE_NAME as DATA_EXPORT_PAGE_NAME,
    PAGE_DESCRIPTION as DATA_EXPORT_DESCRIPTION,
} from '../DataExport/DataExport.js'
import {
    PAGE_NAME as DATA_IMPORT_PAGE_NAME,
    PAGE_DESCRIPTION as DATA_IMPORT_DESCRIPTION,
} from '../DataImport/DataImport.js'
import {
    PAGE_NAME as EVENT_EXPORT_PAGE_NAME,
    PAGE_DESCRIPTION as EVENT_EXPORT_DESCRIPTION,
} from '../EventExport/EventExport.js'
import {
    PAGE_NAME as EVENT_IMPORT_PAGE_NAME,
    PAGE_DESCRIPTION as EVENT_IMPORT_DESCRIPTION,
} from '../EventImport/EventImport.js'
import {
    PAGE_NAME as GEOMETRY_IMPORT_PAGE_NAME,
    PAGE_DESCRIPTION as GEOMETRY_IMPORT_DESCRIPTION,
} from '../GeometryImport/GeometryImport.js'
import {
    PAGE_NAME as METADATA_DEPENDENCY_EXPORT_PAGE_NAME,
    PAGE_DESCRIPTION as METADATA_DEPENDENCY_EXPORT_DESCRIPTION,
} from '../MetadataDependencyExport/MetadataDependencyExport.js'
import {
    PAGE_NAME as METADATA_EXPORT_PAGE_NAME,
    PAGE_DESCRIPTION as METADATA_EXPORT_DESCRIPTION,
} from '../MetadataExport/MetadataExport.js'
import {
    PAGE_NAME as METADATA_IMPORT_PAGE_NAME,
    PAGE_DESCRIPTION as METADATA_IMPORT_DESCRIPTION,
} from '../MetadataImport/MetadataImport.js'
import {
    PAGE_NAME as TEI_EXPORT_PAGE_NAME,
    PAGE_DESCRIPTION as TEI_EXPORT_DESCRIPTION,
} from '../TEIExport/TEIExport.js'
// import pages
import {
    PAGE_NAME as TEI_IMPORT_PAGE_NAME,
    PAGE_DESCRIPTION as TEI_IMPORT_DESCRIPTION,
} from '../TEIImport/TEIImport.js'

const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1)
const capitalizeName = (name) =>
    name.split(' ').map(capitalizeFirstLetter).join(' ')
const capitalizePages = (pages) =>
    pages.map((p) => ({ ...p, name: capitalizeName(p.name) }))

const exportPages = capitalizePages([
    {
        name: DATA_EXPORT_PAGE_NAME,
        description: DATA_EXPORT_DESCRIPTION,
        linkText: i18n.t('Export data'),
        to: '/export/data',
    },
    {
        name: EVENT_EXPORT_PAGE_NAME,
        description: EVENT_EXPORT_DESCRIPTION,
        linkText: i18n.t('Export events'),
        to: '/export/event',
    },
    {
        name: METADATA_DEPENDENCY_EXPORT_PAGE_NAME,
        description: METADATA_DEPENDENCY_EXPORT_DESCRIPTION,
        linkText: i18n.t('Export metadata dependencies'),
        to: '/export/metadata-dependency',
    },
    {
        name: METADATA_EXPORT_PAGE_NAME,
        description: METADATA_EXPORT_DESCRIPTION,
        linkText: i18n.t('Export metadata'),
        to: '/export/metadata',
    },
    {
        name: TEI_EXPORT_PAGE_NAME,
        description: TEI_EXPORT_DESCRIPTION,
        linkText: i18n.t('Export tracked entity instances'),
        to: '/export/tei',
    },
])

const importPages = capitalizePages([
    {
        name: DATA_IMPORT_PAGE_NAME,
        description: DATA_IMPORT_DESCRIPTION,
        linkText: i18n.t('Import data'),
        to: '/import/data',
    },
    {
        name: EVENT_IMPORT_PAGE_NAME,
        description: EVENT_IMPORT_DESCRIPTION,
        linkText: i18n.t('Import events'),
        to: '/import/event',
    },
    {
        name: GEOMETRY_IMPORT_PAGE_NAME,
        description: GEOMETRY_IMPORT_DESCRIPTION,
        linkText: i18n.t('Import GeoJSON'),
        to: '/import/geometry',
    },
    {
        name: METADATA_IMPORT_PAGE_NAME,
        description: METADATA_IMPORT_DESCRIPTION,
        linkText: i18n.t('Import metadata'),
        to: '/import/metadata',
    },
    {
        name: TEI_IMPORT_PAGE_NAME,
        description: TEI_IMPORT_DESCRIPTION,
        linkText: i18n.t('Import tracked entity instances'),
        to: '/import/tei',
    },
])

export { exportPages, importPages }
