const EXCLUDE_SCHEMAS = new Set([
    'analyticsTableHooks',
    'charts',
    'constants',
    'dataElementDimensions',
    'dataEntryForms',
    'dataSetNotificationTemplates',
    'dataStores',
    'documents',
    'eventCharts',
    'eventReports',
    'icons',
    'jobConfigurations',
    'messageConversations',
    'metadataVersions',
    'minMaxDataElements',
    'oAuth2Clients',
    'programDataElements',
    'programNotificationTemplates',
    'pushAnalysis',
    'reportTables',
    'reportingRates',
    'reports',
    'sections',
    'smsCommands',
    'sqlViews',
    'trackedEntityInstanceFilters',
    'validationNotificationTemplates',
]);

const getEndpointExtension = (format, compression) =>
    compression ? `${format}.${compression}` : format;

export { getEndpointExtension, EXCLUDE_SCHEMAS };
