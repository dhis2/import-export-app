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

// From API version 41 onwards, the GML geometry import (POST /api/metadata/gml) is
// executed by the backend as a METADATA_IMPORT job, so its progress events and summary
// are published under the METADATA_IMPORT notifier category rather than GML_IMPORT.
// Translate the UI import category to the backend notifier category when polling on
// 41+, while keeping GML_IMPORT as the UI category used for grouping, filtering and job
// recreation. Before version 41, GML imports are tracked directly under GML_IMPORT, so
// no translation is needed. [DHIS2-21758]
const toNotifierCategory = (importType, apiVersion) =>
    importType === 'GML_IMPORT' && apiVersion >= 41
        ? 'METADATA_IMPORT'
        : importType

export { categoryTypes, allCategories, toNotifierCategory }
