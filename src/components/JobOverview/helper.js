import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { DataIcon, EventIcon, GMLIcon, MetadataImportIcon } from '../Icon'

const categoryTypes = [
    {
        key: 'data',
        importType: 'DATAVALUE_IMPORT',
        icon: <DataIcon />,
        label: i18n.t('Data'),
    },
    {
        key: 'event',
        importType: 'EVENT_IMPORT',
        icon: <EventIcon />,
        label: i18n.t('Event'),
    },
    {
        key: 'gml',
        importType: 'GML_IMPORT',
        icon: <GMLIcon />,
        label: i18n.t('GML'),
    },
    {
        key: 'metadata',
        importType: 'METADATA_IMPORT',
        icon: <MetadataImportIcon />,
        label: i18n.t('Metadata'),
    },
]

const categoryTypesObj = categoryTypes.reduce((acc, cur) => {
    acc[cur.importType] = cur
    return acc
}, {})

const jobToPath = job => ({
    pathname: `/import/${categoryTypesObj[job.importType].key}`,
    query: { id: job.id },
})

export { categoryTypes, categoryTypesObj, jobToPath }
