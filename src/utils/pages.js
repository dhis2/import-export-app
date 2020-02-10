import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { DataImport } from '../pages/DataImport'
import { DataExport } from '../pages/DataExport'
import { EventExport } from '../pages/EventExport'
import { EventImport } from '../pages/EventImport'
import { GMLImport } from '../pages/GMLImport'
import { MetadataDependencyExport } from '../pages/MetadataDependencyExport'
import { MetadataExport } from '../pages/MetadataExport'
import { MetadataImport } from '../pages/MetadataImport'
import { JobOverview } from '../pages/JobOverview'

import {
    DataIcon,
    EventIcon,
    GMLIcon,
    MetadataDependencyExportIcon,
    MetadataExportIcon,
    MetadataImportIcon,
    TasksIcon,
} from '../components/Icon'

const dataImportPage = {
    name: i18n.t('Data import'),
    code: 'data-import',
    description: i18n.t(
        'Import data values from ADX XML, DXF 2 XML, JSON, CSV or PDF files.'
    ),
    icon: <DataIcon />,
    path: '/import/data',
    component: DataImport,
}

const eventImportPage = {
    name: i18n.t('Event import'),
    code: 'event-import',
    description: i18n.t(
        'Import events for programs, stages and tracked entities using the DXF 2 format.'
    ),
    icon: <EventIcon />,
    path: '/import/event',
    component: EventImport,
}

const gmlImportPage = {
    name: i18n.t('GML import'),
    code: 'gml-import',
    description: i18n.t(
        'Import geographic data for organisation units using the GML format. GML is an XML grammar for expressing geographical features.'
    ),
    icon: <GMLIcon />,
    path: '/import/gml',
    component: GMLImport,
}

const metadataImportPage = {
    name: i18n.t('Metadata import'),
    code: 'metadata-import',
    description: i18n.t(
        'Import metadata like data elements and organisation units using the DXF 2 format.'
    ),
    path: '/import/metadata',
    icon: <MetadataImportIcon />,
    component: MetadataImport,
}

const dataExportPage = {
    name: i18n.t('Data export'),
    code: 'data-export',
    description: i18n.t(
        'Export data values as ADX XML, DFX 2 XML, JSON or CSV files.'
    ),
    path: '/export/data',
    icon: <DataIcon />,
    component: DataExport,
}

const eventExportPage = {
    name: i18n.t('Event export'),
    code: 'event-export',
    description: i18n.t(
        'Export event data for programs, stages and tracked entities in the DXF 2 format.'
    ),
    path: '/export/event',
    icon: <EventIcon />,
    component: EventExport,
}

const metadataDependencyExportPage = {
    name: i18n.t('Metadata dependency export'),
    code: 'metadata-dependency-export',
    description: i18n.t(
        'Export metadata like data sets and programs including related metadata objects in the XML or JSON format.'
    ),
    path: '/export/metadata-dependency',
    icon: <MetadataDependencyExportIcon />,
    component: MetadataDependencyExport,
}

const metadataExportPage = {
    name: i18n.t('Metadata export'),
    code: 'metadata-export',
    description: i18n.t(
        'Export meta data like data elements and organisation units in the XML, JSON or CSV format.'
    ),
    path: '/export/metadata',
    icon: <MetadataExportIcon />,
    component: MetadataExport,
}

const ImportPages = [
    dataImportPage,
    eventImportPage,
    gmlImportPage,
    metadataImportPage,
]

const ExportPages = [
    dataExportPage,
    eventExportPage,
    metadataDependencyExportPage,
    metadataExportPage,
]

const JobOverviewPage = {
    name: i18n.t('Job overview'),
    code: 'job-overview',
    description: i18n.t('An overview of all import jobs started this session.'),
    path: '/utils/job-overview',
    icon: <TasksIcon />,
    component: JobOverview,
}

const AllPages = [...ImportPages, ...ExportPages, JobOverviewPage]

export const pagePropType = PropTypes.exact({
    code: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
})

export {
    dataImportPage,
    eventImportPage,
    gmlImportPage,
    metadataImportPage,
    dataExportPage,
    eventExportPage,
    metadataDependencyExportPage,
    metadataExportPage,
}

export { ImportPages, ExportPages, JobOverviewPage, AllPages as Pages }
