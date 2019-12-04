import React from 'react';

const PlaceHolder = ({ name }) => {
    return <h2>{name}</h2>;
};

const dataImportPage = {
    name: 'Data import',
    description:
        'Import data values on the DXF 2 XML, JSON, CSV and PDF formatrant s. DXF 2 is the standard exchange format for DHIS 2.',
    path: '/import/data',
    component: <PlaceHolder name="import/data" />,
};

const eventImportPage = {
    name: 'Event import',
    description:
        'Import events for programs, stages and tracked entities in the DXF 2 format.',
    path: '/import/event',
    component: <PlaceHolder name="import/event" />,
};

const gmlImportPage = {
    name: 'GML import',
    description:
        'Import geographic data for organisation units using GML format. GML is an XML grammar for expressing geographical features.',
    path: '/import/gml',
    component: <PlaceHolder name="import/gml" />,
};

const metadataImportPage = {
    name: 'Metadata import',
    description:
        'Import metadata like data elements and organisation units using the standard DHIS 2 exchange format called DXF 2.',
    path: '/import/metadata',
    component: <PlaceHolder name="import/metadata" />,
};

const dataExportPage = {
    name: 'Data export',
    description:
        'Export data values. This is the regular export function which exports data to the DHIS 2 exchange format called DXF 2.',
    path: '/export/data',
    component: <PlaceHolder name="export/data" />,
};

const eventExportPage = {
    name: 'Event export',
    description:
        'Export event data for programs, stages and tracked entities in the DXF 2 format.',
    path: '/export/event',
    component: <PlaceHolder name="export/event" />,
};

const metadataDependencyExportPage = {
    name: 'Metadata dependency export',
    description:
        'Export metadata like data sets and programs including related metadata objects.',
    path: '/export/metadata-dependency',
    component: <PlaceHolder name="export/metadata-dependency" />,
};

const metadataExportPage = {
    name: 'Metadata export',
    description:
        'Export meta data like data elements and organisation units to the standard DHIS 2 exchange format.',
    path: '/export/metadata',
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
