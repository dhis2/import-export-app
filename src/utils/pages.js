import React from 'react';

import {
    DataIcon,
    EventIcon,
    GMLIcon,
    Icon,
    LogoIcon,
    MetadataDependencyExportIcon,
    MetadataExportIcon,
    MetadataImportIcon,
} from '../components/Icon';

const PlaceHolder = ({ name }) => {
    return <h2>{name}</h2>;
};

const dataImportPage = {
    name: 'Data import',
    description:
        'Import data values from ADX XML, DXF 2 XML, JSON, CSV or PDF files.',
    icon: <DataIcon />,
    path: '/import/data',
    component: <PlaceHolder name="import/data" />,
};

const eventImportPage = {
    name: 'Event import',
    description:
        'Import events for programs, stages and tracked entities using the DXF 2 format.',
    icon: <EventIcon />,
    path: '/import/event',
    component: <PlaceHolder name="import/event" />,
};

const gmlImportPage = {
    name: 'GML import',
    description:
        'Import geographic data for organisation units using the GML format. GML is an XML grammar for expressing geographical features.',
    icon: <GMLIcon />,
    path: '/import/gml',
    component: <PlaceHolder name="import/gml" />,
};

const metadataImportPage = {
    name: 'Metadata import',
    description:
        'Import metadata like data elements and organisation units using the DXF 2 format.',
    path: '/import/metadata',
    icon: <MetadataImportIcon />,
    component: <PlaceHolder name="import/metadata" />,
};

const dataExportPage = {
    name: 'Data export',
    description: 'Export data values as ADX XML, DFX 2 XML, JSON or CSV files.',
    path: '/export/data',
    icon: <DataIcon />,
    component: <PlaceHolder name="export/data" />,
};

const eventExportPage = {
    name: 'Event export',
    description:
        'Export event data for programs, stages and tracked entities in the DXF 2 format.',
    path: '/export/event',
    icon: <EventIcon />,
    component: <PlaceHolder name="export/event" />,
};

const metadataDependencyExportPage = {
    name: 'Metadata dependency export',
    description:
        'Export metadata like data sets and programs including related metadata objects in the XML or JSON format.',
    path: '/export/metadata-dependency',
    icon: <MetadataDependencyExportIcon />,
    component: <PlaceHolder name="export/metadata-dependency" />,
};

const metadataExportPage = {
    name: 'Metadata export',
    description:
        'Export meta data like data elements and organisation units in the XML or JSON format.',
    path: '/export/metadata',
    icon: <MetadataExportIcon />,
    component: <PlaceHolder name="export/metadata" />,
};

const ImportPages = [
    dataImportPage,
    eventImportPage,
    gmlImportPage,
    metadataImportPage,
];

const ExportPages = [
    dataExportPage,
    eventExportPage,
    metadataDependencyExportPage,
    metadataExportPage,
];

const AllPages = [...ImportPages, ...ExportPages];

export { ImportPages, ExportPages, AllPages as Pages };
