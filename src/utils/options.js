import i18n from '@dhis2/d2-i18n';

const formatOptions = [
    { value: 'json', label: i18n.t('JSON') },
    { value: 'csv', label: i18n.t('CSV') },
    { value: 'xml', label: i18n.t('XML') },
];

const formatNoCsvOptions = formatOptions.filter(f => f.value != 'csv');

const formatADXOptions = [
    ...formatOptions,
    { value: 'adx', label: i18n.t('ADX') },
];

const compressionOptions = [
    { value: 'zip', label: i18n.t('Zip') },
    { value: 'gz', label: i18n.t('GZip') },
    { value: '', label: i18n.t('Uncompressed') },
];

const sharingOptions = [
    { value: 'false', label: i18n.t('With sharing') },
    { value: 'true', label: i18n.t('Without sharing') },
];

const objectTypeOptions = [
    { value: 'dataSets', label: i18n.t('Data sets') },
    { value: 'programs', label: i18n.t('Programs') },
    { value: 'categoryCombos', label: i18n.t('Category combination') },
    { value: 'dashboards', label: i18n.t('Dashboard') },
    { value: 'dataElementGroups', label: i18n.t('Data element groups') },
    { value: 'optionSets', label: i18n.t('Option sets') },
];

const dataElementIdSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
];

const orgUnitIdSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
];

const idSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
];

const defaultFormatOption = formatOptions[0];
const defaultCompressionOption = compressionOptions[0];
const defaultSharingOption = sharingOptions[0];
const defaultObjectTypeOption = objectTypeOptions[0];
const defaultDataElementIdSchemeOption = dataElementIdSchemeOptions[0];
const defaultOrgUnitIdSchemeOption = orgUnitIdSchemeOptions[0];
const defaultIdSchemeOption = idSchemeOptions[0];

export {
    formatOptions,
    formatNoCsvOptions,
    formatADXOptions,
    compressionOptions,
    sharingOptions,
    objectTypeOptions,
    dataElementIdSchemeOptions,
    orgUnitIdSchemeOptions,
    idSchemeOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultSharingOption,
    defaultObjectTypeOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
};
