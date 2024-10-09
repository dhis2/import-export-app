import i18n from '@dhis2/d2-i18n'
import React from 'react'
import {
    DataIcon,
    EventIcon,
    GeometryIcon,
    MetadataImportIcon,
    TEIIcon,
} from '../components/Icon/Icon.jsx'

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
        key: 'geojson',
        importType: 'GEOJSON_IMPORT',
        icon: <GeometryIcon />,
        label: i18n.t('GeoJSON'),
    },
    {
        key: 'gml',
        importType: 'GML_IMPORT',
        icon: <GeometryIcon />,
        label: i18n.t('GML'),
    },
    {
        key: 'metadata',
        importType: 'METADATA_IMPORT',
        icon: <MetadataImportIcon />,
        label: i18n.t('Metadata'),
    },
    {
        key: 'tei',
        importType: 'TEI_IMPORT',
        icon: <TEIIcon />,
        label: i18n.t('Tracked entity'),
    },
]

const allCategories = categoryTypes.map(({ importType }) => importType)

export { categoryTypes, allCategories }
