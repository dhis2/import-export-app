import i18n from '@dhis2/d2-i18n';

const helpText = {
    dryRun: i18n.t(
        'Will do a test run without importing any data into the database'
    ),
    preheatCache: i18n.t('Faster for large imports'),
    skipAudit: i18n.t(
        'Improves performance at the cost of ability to audit changes'
    ),
    skipExistingCheck: i18n.t('Faster, but unsafe'),
};

export { helpText };
