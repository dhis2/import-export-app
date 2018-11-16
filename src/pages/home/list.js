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
import i18n from '@dhis2/d2-i18n'

export default [
    {
        path: MetaDataImport.path,
        order: MetaDataImport.order,
        menuIcon: MetaDataImport.menuIcon,
        title: i18n.t('Metadata Import'),
        description: i18n.t(
            'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.'
        ),
    },
    {
        path: DataImport.path,
        order: DataImport.order,
        menuIcon: DataImport.menuIcon,
        title: i18n.t('Data Import'),
        description: i18n.t(
            'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.'
        ),
    },
    {
        path: EventImport.path,
        order: EventImport.order,
        menuIcon: EventImport.menuIcon,
        title: i18n.t('Event Import'),
        description: i18n.t(
            'Import events for programs, stages and tracked entities in the DXF 2 format.'
        ),
    },
    {
        path: GMLImport.path,
        order: GMLImport.order,
        menuIcon: GMLImport.menuIcon,
        title: i18n.t('GML Import'),
        description: i18n.t(
            'Import geographic data for organisation units using GML format. GML is an XML grammar for expressing geographical features.'
        ),
    },

    {
        path: MetaDataExport.path,
        order: MetaDataExport.order,
        menuIcon: MetaDataExport.menuIcon,
        title: i18n.t('Metadata Export'),
        description: i18n.t(
            'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.'
        ),
    },
    {
        path: DataExport.path,
        order: DataExport.order,
        menuIcon: DataExport.menuIcon,
        title: i18n.t('Data Export'),
        description: i18n.t(
            'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.'
        ),
    },
    {
        path: EventExport.path,
        order: EventExport.order,
        menuIcon: EventExport.menuIcon,
        title: i18n.t('Event Export'),
        description: i18n.t(
            'Export event data for programs, stages and tracked entities in the DXF 2 format.'
        ),
    },
    {
        path: MetaDataDependencyExport.path,
        order: MetaDataDependencyExport.order,
        menuIcon: MetaDataDependencyExport.menuIcon,
        title: i18n.t('Metadata Dependency Export'),
        description: i18n.t(
            'Export metadata like data sets and programs including related metadata objects.'
        ),
    },
]
