import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

const formatOptions = [
    { value: 'json', label: i18n.t('JSON') },
    { value: 'csv', label: i18n.t('CSV') },
    { value: 'xml', label: i18n.t('XML') },
]

const formatNoCsvOptions = formatOptions.filter(f => f.value != 'csv')

const formatAdxOptions = [
    ...formatOptions,
    { value: 'adx', label: i18n.t('ADX') },
]

const formatAdxPdfOptions = [
    ...formatAdxOptions,
    { value: 'pdf', label: i18n.t('PDF') },
]

const formatJsonpOptions = [
    ...formatOptions,
    { value: 'jsonp', label: i18n.t('JSONP') },
]

const compressionOptions = [
    { value: 'zip', label: i18n.t('Zip') },
    { value: 'gz', label: i18n.t('GZip') },
    { value: '', label: i18n.t('Uncompressed') },
]

const objectTypeOptions = [
    { value: 'dataSets', label: i18n.t('Data sets') },
    { value: 'programs', label: i18n.t('Programs') },
    { value: 'categoryCombos', label: i18n.t('Category combination') },
    { value: 'dashboards', label: i18n.t('Dashboard') },
    { value: 'dataElementGroups', label: i18n.t('Data element groups') },
    { value: 'optionSets', label: i18n.t('Option sets') },
]

const dataElementIdSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]

const orgUnitIdSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]

const idSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
]

const eventIdSchemeOptions = [...idSchemeOptions]

const inclusionOptions = [
    {
        value: 'SELECTED',
        label: i18n.t('Selected organisation unit'),
    },
    {
        value: 'CHILDREN',
        label: i18n.t('Include children of organisation unit'),
    },
    {
        value: 'DESCENDANTS',
        label: i18n.t('Include descendants of organisation unit'),
    },
]

const skipExisitingCheckOptions = [
    { value: 'true', label: i18n.t('Skip check'), help: 'fast' },
    { value: 'false', label: i18n.t('Check'), help: 'safe, recommended' },
]

const strategyOptions = [
    { value: 'NEW_AND_UPDATES', label: i18n.t('New and updates') },
    { value: 'NEW', label: i18n.t('New only') },
    { value: 'UPDATES', label: i18n.t('Updates only') },
    { value: 'DELETE', label: i18n.t('Delete') },
]

const importStrategyOptions = [
    { value: 'CREATE_AND_UPDATE', label: i18n.t('New and updates') },
    { value: 'CREATE', label: i18n.t('New only') },
    { value: 'UPDATES', label: i18n.t('Updates only') },
    { value: 'DELETE', label: i18n.t('Delete') },
]

const identifierOptions = [
    { value: 'UID', label: i18n.t('UID') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'AUTO', label: i18n.t('Auto') },
]

const importReportModeOptions = [
    { value: 'ERRORS', label: i18n.t('Errors') },
    { value: 'FULL', label: i18n.t('Full') },
    { value: 'DEBUG', label: i18n.t('Debug') },
]

const preheatModeOptions = [
    { value: 'REFERENCE', label: i18n.t('Reference') },
    { value: 'ALL', label: i18n.t('All') },
    { value: 'NONE', label: i18n.t('None') },
]

const atomicModeOptions = [
    { value: 'ALL', label: i18n.t('All') },
    { value: 'NONE', label: i18n.t('None') },
]

const mergeModeOptions = [
    { value: 'MERGE', label: i18n.t('Merge') },
    { value: 'REPLACE', label: i18n.t('Replace') },
]

const flushModeOptions = [
    { value: 'AUTO', label: i18n.t('Auto') },
    { value: 'OBJECT', label: i18n.t('Object') },
]

const inclusionStrategyOptions = [
    { value: 'NON_NULL', label: i18n.t('Non Null') },
    { value: 'ALWAYS', label: i18n.t('Always') },
    { value: 'NON_EMPTY', label: i18n.t('Non Empty') },
]

const orgUnitSelectionModeOptions = [
    {
        value: 'SELECTED',
        label: i18n.t('Selected organisation units'),
    },
    {
        value: 'CHILDREN',
        label: i18n.t('Include children of selected organisation units'),
    },
    {
        value: 'DESCENDANTS',
        label: i18n.t('Include descendants of selected organisation unit'),
    },
    {
        value: 'ACCESSIBLE',
        label: i18n.t(
            'Data view organisation units associated with the current user'
        ),
    },
    {
        value: 'CAPTURE',
        label: i18n.t(
            'Data capture organisation units associated with the current user'
        ),
    },
    {
        value: 'ALL',
        label: i18n.t('All organisation units in the system'),
    },
]

const teiTypeFilterOptions = [
    { value: 'NONE', label: i18n.t('None') },
    { value: 'PROGRAM', label: i18n.t('Program') },
    { value: 'TE', label: i18n.t('Tracked entity') },
]

const programStatusOptions = [
    { value: 'ALL', label: i18n.t('All') },
    { value: 'ACTIVE', label: i18n.t('Active') },
    { value: 'COMPLETED', label: i18n.t('Completed') },
    { value: 'CANCELLED', label: i18n.t('Cancelled') },
]

const followUpStatusOptions = [
    { value: 'ALL', label: i18n.t('All') },
    { value: 'TRUE', label: i18n.t('True') },
    { value: 'FALSE', label: i18n.t('False') },
]

const lastUpdatedFilterOptions = [
    { value: 'NONE', label: i18n.t('None') },
    { value: 'DATE', label: i18n.t('Start and end date') },
    { value: 'DURATION', label: i18n.t('Duration') },
]

const assignedUserModeOptions = [
    { value: 'ANY', label: i18n.t('Any') },
    { value: 'CURRENT', label: i18n.t('Current') },
    { value: 'NONE', label: i18n.t('None') },
    { value: 'PROVIDED', label: i18n.t('Provided') },
]

const defaultFormatOption = formatOptions[0]
const defaultCompressionOption = compressionOptions[0]
const defaultObjectTypeOption = objectTypeOptions[0]
const defaultDataElementIdSchemeOption = dataElementIdSchemeOptions[0]
const defaultOrgUnitIdSchemeOption = orgUnitIdSchemeOptions[0]
const defaultIdSchemeOption = idSchemeOptions[0]
const defaultEventIdSchemeOption = eventIdSchemeOptions[0]
const defaultInclusionOption = inclusionOptions[0]
const defaultSkipExisitingCheckOption = skipExisitingCheckOptions[0]
const defaultStrategyOption = strategyOptions[0]
const defaultIdentifierOption = identifierOptions[0]
const defaultImportReportModeOption = importReportModeOptions[0]
const defaultPreheatModeOption = preheatModeOptions[0]
const defaultImportStrategyOption = importStrategyOptions[0]
const defaultAtomicModeOption = atomicModeOptions[0]
const defaultMergeModeOption = mergeModeOptions[0]
const defaultFlushModeOption = flushModeOptions[0]
const defaultInclusionStrategyOption = inclusionStrategyOptions[0]
const defaultOrgUnitSelectionModeOption = orgUnitSelectionModeOptions[0]
const defaultTEITypeFilterOption = teiTypeFilterOptions[0]
const defaultProgramStatusOption = programStatusOptions[0]
const defaultFollowUpStatusOption = followUpStatusOptions[0]
const defaultLastUpdatedFilterOption = lastUpdatedFilterOptions[0]
const defaultAssignedUserModeOption = assignedUserModeOptions[0]

const optionPropType = PropTypes.exact({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
})

const optionsPropType = PropTypes.arrayOf(optionPropType)

export {
    formatOptions,
    formatNoCsvOptions,
    formatAdxOptions,
    formatAdxPdfOptions,
    formatJsonpOptions,
    compressionOptions,
    objectTypeOptions,
    dataElementIdSchemeOptions,
    orgUnitIdSchemeOptions,
    idSchemeOptions,
    eventIdSchemeOptions,
    inclusionOptions,
    skipExisitingCheckOptions,
    strategyOptions,
    identifierOptions,
    importReportModeOptions,
    preheatModeOptions,
    importStrategyOptions,
    atomicModeOptions,
    mergeModeOptions,
    flushModeOptions,
    inclusionStrategyOptions,
    orgUnitSelectionModeOptions,
    teiTypeFilterOptions,
    programStatusOptions,
    followUpStatusOptions,
    lastUpdatedFilterOptions,
    assignedUserModeOptions,
    defaultFormatOption,
    defaultCompressionOption,
    defaultObjectTypeOption,
    defaultDataElementIdSchemeOption,
    defaultOrgUnitIdSchemeOption,
    defaultIdSchemeOption,
    defaultEventIdSchemeOption,
    defaultInclusionOption,
    defaultSkipExisitingCheckOption,
    defaultStrategyOption,
    defaultIdentifierOption,
    defaultImportReportModeOption,
    defaultPreheatModeOption,
    defaultImportStrategyOption,
    defaultAtomicModeOption,
    defaultMergeModeOption,
    defaultFlushModeOption,
    defaultInclusionStrategyOption,
    defaultOrgUnitSelectionModeOption,
    defaultTEITypeFilterOption,
    defaultProgramStatusOption,
    defaultFollowUpStatusOption,
    defaultLastUpdatedFilterOption,
    defaultAssignedUserModeOption,
    optionPropType,
    optionsPropType,
}
