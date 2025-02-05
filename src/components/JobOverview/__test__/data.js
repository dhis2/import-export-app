export const tasksState = {
    data: {
        EcJpZjEcMfI: {
            id: 'EcJpZjEcMfI',
            level: 'INFO',
            created: new Date('2020-02-12T13:00:23.350'),
            lastUpdated: new Date('2020-02-12T13:00:23.766'),
            completed: true,
            events: [
                {
                    id: 'init',
                    text: 'Initiated dataValueImport',
                    date: new Date('2020-02-12T12:00:23.230'),
                },
                {
                    id: 'LPCnEwppbqy',
                    level: 'INFO',
                    text: 'Process started',
                    date: new Date('2020-02-12T12:00:23.232'),
                },
                {
                    id: 'quL1PHwVPg1',
                    level: 'INFO',
                    text: 'Importing data values',
                    date: new Date('2020-02-12T12:00:23.498'),
                },
                {
                    id: 'fn5gnxqYk1J',
                    level: 'INFO',
                    text: 'Import done',
                    date: new Date('2020-02-12T12:00:23.499'),
                },
            ],
            summary: {
                responseType: 'ImportSummary',
                status: 'SUCCESS',
                importOptions: {
                    idSchemes: {},
                    dryRun: true,
                    preheatCache: true,
                    async: true,
                    importStrategy: 'NEW_AND_UPDATES',
                    mergeMode: 'REPLACE',
                    reportMode: 'FULL',
                    skipExistingCheck: false,
                    sharing: false,
                    skipNotifications: false,
                    skipAudit: false,
                    datasetAllowsPeriods: false,
                    strictPeriods: false,
                    strictDataElements: false,
                    strictCategoryOptionCombos: false,
                    strictAttributeOptionCombos: false,
                    strictOrganisationUnits: false,
                    requireCategoryOptionCombo: false,
                    requireAttributeOptionCombo: false,
                    skipPatternValidation: false,
                    ignoreEmptyCollection: false,
                    force: false,
                    firstRowIsHeader: true,
                    skipLastUpdated: false,
                },
                description: 'Import process completed successfully',
                importCount: {
                    imported: 0,
                    updated: 0,
                    ignored: 0,
                    deleted: 0,
                },
                dataSetComplete: 'false',
            },
            error: false,
            importType: 'DATAVALUE_IMPORT',
            jobDetails: {
                files: [new File([], 'data1.json')],
                format: {
                    value: 'json',
                    label: 'JSON',
                },
                dryRun: true,
                strategy: {
                    value: 'NEW_AND_UPDATES',
                    label: 'New and updates',
                },
                preheatCache: true,
                skipAudit: false,
                dataElementIdScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                orgUnitIdScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                idScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                skipExistingCheck: false,
                firstRowIsHeader: false,
            },
        },
        SN0RKLRMWBY: {
            id: 'SN0RKLRMWBY',
            level: 'INFO',
            created: new Date('2020-02-12T13:00:59.136'),
            lastUpdated: new Date('2020-02-12T13:00:59.240'),
            completed: true,
            events: [
                {
                    id: 'init',
                    text: 'Initiated dataValueImport',
                    date: new Date('2020-02-12T12:00:58.999'),
                },
                {
                    id: 'oE17j9gw54i',
                    level: 'INFO',
                    text: 'Process started',
                    date: new Date('2020-02-12T12:00:59.001'),
                },
                {
                    id: 'SKEyN7hdwyd',
                    level: 'INFO',
                    text: 'Importing data values',
                    date: new Date('2020-02-12T12:00:59.035'),
                },
                {
                    id: 'CO2RDYqaGde',
                    level: 'INFO',
                    text: 'Import done',
                    date: new Date('2020-02-12T12:00:59.148'),
                },
            ],
            summary: {
                responseType: 'ImportSummary',
                status: 'WARNING',
                importOptions: {
                    idSchemes: {},
                    dryRun: true,
                    preheatCache: false,
                    async: true,
                    importStrategy: 'UPDATES',
                    mergeMode: 'REPLACE',
                    reportMode: 'FULL',
                    skipExistingCheck: true,
                    sharing: false,
                    skipNotifications: false,
                    skipAudit: false,
                    datasetAllowsPeriods: false,
                    strictPeriods: false,
                    strictDataElements: false,
                    strictCategoryOptionCombos: false,
                    strictAttributeOptionCombos: false,
                    strictOrganisationUnits: false,
                    requireCategoryOptionCombo: false,
                    requireAttributeOptionCombo: false,
                    skipPatternValidation: false,
                    ignoreEmptyCollection: false,
                    force: false,
                    firstRowIsHeader: true,
                    skipLastUpdated: false,
                },
                description: 'Import process completed successfully',
                importCount: {
                    imported: 0,
                    updated: 0,
                    ignored: 173,
                    deleted: 0,
                },
                conflicts: [
                    {
                        object: 'V6L425pT3A0',
                        value: 'Category option combo not found or not accessible for writing data',
                    },
                    {
                        object: 'Prlt0C1RF0s',
                        value: 'Category option combo not found or not accessible for writing data',
                    },
                    {
                        object: 'hEFKSsPV5et',
                        value: 'Category option combo not found or not accessible for writing data',
                    },
                    {
                        object: 'psbwp3CQEhs',
                        value: 'Category option combo not found or not accessible for writing data',
                    },
                ],
                dataSetComplete: 'false',
            },
            error: false,
            importType: 'DATAVALUE_IMPORT',
            jobDetails: {
                files: [new File([], 'data2.json')],
                format: {
                    value: 'json',
                    label: 'JSON',
                },
                dryRun: true,
                strategy: {
                    value: 'UPDATES',
                    label: 'Updates only',
                },
                preheatCache: false,
                skipAudit: false,
                dataElementIdScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                orgUnitIdScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                idScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                skipExistingCheck: true,
                firstRowIsHeader: false,
            },
        },
    },
    event: {
        xW1s5Xo5rWZ: {
            id: 'xW1s5Xo5rWZ',
            level: 'INFO',
            created: new Date('2020-02-12T13:00:28.184'),
            lastUpdated: new Date('2020-02-12T13:00:28.291'),
            completed: true,
            events: [
                {
                    id: 'init',
                    text: 'Initiated inMemoryEventImport',
                    date: new Date('2020-02-12T12:00:28.136'),
                },
                {
                    id: 'sso1rmwbq4i',
                    level: 'INFO',
                    text: 'Importing events',
                    date: new Date('2020-02-12T12:00:28.137'),
                },
                {
                    id: 'kRVdpRp3pIy',
                    level: 'INFO',
                    text: 'Import done. Completed in 00:00:00.013.',
                    date: new Date('2020-02-12T12:00:28.154'),
                },
            ],
            summary: {
                responseType: 'ImportSummaries',
                status: 'ERROR',
                imported: 0,
                updated: 0,
                deleted: 0,
                ignored: 1,
                importSummaries: [
                    {
                        responseType: 'ImportSummary',
                        status: 'ERROR',
                        description: 'Event date is required. ',
                        importCount: {
                            imported: 0,
                            updated: 0,
                            ignored: 1,
                            deleted: 0,
                        },
                    },
                ],
                total: 1,
            },
            error: true,
            importType: 'EVENT_IMPORT',
            jobDetails: {
                files: [new File([], 'event1.json')],
                format: {
                    value: 'json',
                    label: 'JSON',
                },
                dryRun: false,
                orgUnitIdScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
            },
        },
    },
    geojson: {
        1581512432381: {
            id: 1581512432381,
            level: 'INFO',
            created: new Date('2020-02-12T13:00:34.380'),
            lastUpdated: new Date('2020-02-12T13:00:34.380'),
            completed: true,
            events: [
                {
                    id: 'init',
                    text: 'Failed to validate job runtime - `GeoJSON import failed.`',
                    date: new Date('2020-02-12T13:00:34.380'),
                },
            ],
            summary: {
                status: 'ERROR',
                stats: {
                    created: 0,
                    updated: 0,
                    deleted: 0,
                    ignored: 0,
                    total: 0,
                },
                typeReports: [
                    {
                        klass: 'org.hisp.dhis.dxf2.geojson.DefaultGeoJsonService',
                        stats: {
                            created: 0,
                            updated: 0,
                            deleted: 0,
                            ignored: 0,
                            total: 0,
                        },
                        objectReports: [
                            {
                                klass: 'org.hisp.dhis.dxf2.geojson.DefaultGeoJsonService',
                                index: 0,
                                errorReports: [
                                    {
                                        message:
                                            'Failed to validate job runtime - `GeoJSON import failed.`',
                                        mainKlass:
                                            'org.hisp.dhis.dxf2.geojson.DefaultGeoJsonService',
                                        errorCode: 'E7010',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            error: true,
            importType: 'GEOJSON_IMPORT',
            jobDetails: {
                files: [new File([], 'geojson1.json')],
                dryRun: true,
            },
        },
    },
    gml: {
        1581512432380: {
            id: 1581512432380,
            level: 'INFO',
            created: new Date('2020-02-12T13:00:32.380'),
            lastUpdated: new Date('2020-02-12T13:00:32.380'),
            completed: true,
            events: [
                {
                    id: 'init',
                    text: 'Failed to validate job runtime - `GML import failed: Content is not allowed in prolog. On line 1 column 1.`',
                    date: new Date('2020-02-12T13:00:32.380'),
                },
            ],
            summary: {
                status: 'ERROR',
                stats: {
                    created: 0,
                    updated: 0,
                    deleted: 0,
                    ignored: 0,
                    total: 0,
                },
                typeReports: [
                    {
                        klass: 'org.hisp.dhis.dxf2.gml.DefaultGmlImportService',
                        stats: {
                            created: 0,
                            updated: 0,
                            deleted: 0,
                            ignored: 0,
                            total: 0,
                        },
                        objectReports: [
                            {
                                klass: 'org.hisp.dhis.dxf2.gml.DefaultGmlImportService',
                                index: 0,
                                errorReports: [
                                    {
                                        message:
                                            'Failed to validate job runtime - `GML import failed: Content is not allowed in prolog. On line 1 column 1.`',
                                        mainKlass:
                                            'org.hisp.dhis.dxf2.gml.DefaultGmlImportService',
                                        errorCode: 'E7010',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            error: true,
            importType: 'GML_IMPORT',
            jobDetails: {
                files: [new File([], 'gml1.gml')],
                dryRun: true,
            },
        },
    },
    metadata: {
        zS69mHvSSfj: {
            id: 'zS69mHvSSfj',
            level: 'INFO',
            created: new Date('2020-02-12T13:00:38.990'),
            lastUpdated: new Date('2020-02-12T13:00:39.155'),
            completed: true,
            events: [
                {
                    id: 'init',
                    text: 'Initiated metadataImport',
                    date: new Date('2020-02-12T12:00:38.727'),
                },
                {
                    id: 'kltTBpl5Xxy',
                    level: 'INFO',
                    text: '(admin) Import:Start',
                    date: new Date('2020-02-12T12:00:38.751'),
                },
                {
                    id: 'JvqlsZAY0c1',
                    level: 'INFO',
                    text: '(admin) Import:Done took 0.14 seconds',
                    date: new Date('2020-02-12T12:00:38.892'),
                },
            ],
            summary: {
                importParams: {
                    userOverrideMode: 'NONE',
                    importMode: 'COMMIT',
                    identifier: 'UID',
                    preheatMode: 'REFERENCE',
                    importStrategy: 'CREATE_AND_UPDATE',
                    atomicMode: 'ALL',
                    mergeMode: 'MERGE',
                    flushMode: 'AUTO',
                    skipSharing: false,
                    skipTranslation: false,
                    skipValidation: false,
                    metadataSyncImport: false,
                    csvImportClass: 'ORGANISATION_UNIT_GROUP_MEMBERSHIP',
                    firstRowIsHeader: true,
                    username: 'admin',
                },
                status: 'OK',
                stats: {
                    created: 0,
                    updated: 0,
                    deleted: 0,
                    ignored: 0,
                    total: 0,
                },
            },
            error: false,
            importType: 'METADATA_IMPORT',
            jobDetails: {
                files: [new File([], 'metadata1.csv')],
                format: {
                    value: 'csv',
                    label: 'CSV',
                },
                dryRun: false,
                identifier: {
                    value: 'UID',
                    label: 'UID',
                },
                importReportMode: {
                    value: 'ERRORS',
                    label: 'Errors',
                },
                preheatMode: {
                    value: 'REFERENCE',
                    label: 'Reference',
                },
                importStrategy: {
                    value: 'CREATE_AND_UPDATE',
                    label: 'New and updates',
                },
                firstRowIsHeader: true,
                classKey: {
                    value: 'ORGANISATION_UNIT_GROUP_MEMBERSHIP',
                    label: 'ORGANISATION_UNIT_GROUP_MEMBERSHIP',
                },
                atomicMode: {
                    value: 'ALL',
                    label: 'All',
                },
                mergeMode: {
                    value: 'MERGE',
                    label: 'Merge',
                },
                flushMode: {
                    value: 'AUTO',
                    label: 'Auto',
                },
                inclusionStrategy: {
                    value: 'NON_NULL',
                    label: 'Non Null',
                },
                skipSharing: false,
                skipValidation: false,
                isAsync: true,
            },
        },
    },
    tei: {},
}

export const jobOverviewState = {
    jobOverview: {
        activeTypes: [
            'DATAVALUE_IMPORT',
            'EVENT_IMPORT',
            'GEOJSON_IMPORT',
            'GML_IMPORT',
            'METADATA_IMPORT',
        ],
        selectedJob: {
            id: 'EcJpZjEcMfI',
            level: 'INFO',
            created: new Date('2020-02-12T13:00:23.350'),
            lastUpdated: new Date('2020-02-12T13:00:23.766'),
            completed: true,
            events: [
                {
                    id: 'init',
                    text: 'Initiated dataValueImport',
                    date: new Date('2020-02-12T12:00:23.230'),
                },
                {
                    id: 'LPCnEwppbqy',
                    level: 'INFO',
                    text: 'Process started',
                    date: new Date('2020-02-12T12:00:23.232'),
                },
                {
                    id: 'quL1PHwVPg1',
                    level: 'INFO',
                    text: 'Importing data values',
                    date: new Date('2020-02-12T12:00:23.498'),
                },
                {
                    id: 'fn5gnxqYk1J',
                    level: 'INFO',
                    text: 'Import done',
                    date: new Date('2020-02-12T12:00:23.499'),
                },
            ],
            summary: {
                responseType: 'ImportSummary',
                status: 'SUCCESS',
                importOptions: {
                    idSchemes: {},
                    dryRun: true,
                    preheatCache: true,
                    async: true,
                    importStrategy: 'NEW_AND_UPDATES',
                    mergeMode: 'REPLACE',
                    reportMode: 'FULL',
                    skipExistingCheck: false,
                    sharing: false,
                    skipNotifications: false,
                    skipAudit: false,
                    datasetAllowsPeriods: false,
                    strictPeriods: false,
                    strictDataElements: false,
                    strictCategoryOptionCombos: false,
                    strictAttributeOptionCombos: false,
                    strictOrganisationUnits: false,
                    requireCategoryOptionCombo: false,
                    requireAttributeOptionCombo: false,
                    skipPatternValidation: false,
                    ignoreEmptyCollection: false,
                    force: false,
                    firstRowIsHeader: true,
                    skipLastUpdated: false,
                },
                description: 'Import process completed successfully',
                importCount: {
                    imported: 0,
                    updated: 0,
                    ignored: 0,
                    deleted: 0,
                },
                dataSetComplete: 'false',
            },
            error: false,
            importType: 'DATAVALUE_IMPORT',
            jobDetails: {
                files: [],
                format: {
                    value: 'json',
                    label: 'JSON',
                },
                dryRun: true,
                strategy: {
                    value: 'NEW_AND_UPDATES',
                    label: 'New and updates',
                },
                preheatCache: true,
                skipAudit: false,
                dataElementIdScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                orgUnitIdScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                idScheme: {
                    value: 'UID',
                    label: 'Uid',
                },
                skipExistingCheck: false,
                firstRowIsHeader: false,
            },
        },
    },
}

export const allJobs = ['data', 'event', 'geojson', 'gml', 'metadata', 'tei']
    .map((type) =>
        Object.keys(tasksState[type]).map((id) => tasksState[type][id])
    )
    .flat()
