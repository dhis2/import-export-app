import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React from 'react'
import { RadioGroupField } from '../index.js'

// used by the tracker import endpoint (/api/tracker)
const atomicModeOptions = [
    { value: 'ALL', label: i18n.t('Do not import') },
    { value: 'OBJECT', label: i18n.t('Import') },
]
// used by the metadata import endpoint (/api/metadata), which has no OBJECT mode
const atomicModeMetadataOptions = [
    { value: 'ALL', label: i18n.t('Do not import') },
    { value: 'NONE', label: i18n.t('Import') },
]
const defaultAtomicModeOption = atomicModeOptions[0].value

const NAME = 'atomicMode'
const DATATEST = 'input-atomic-mode'
const LABEL = i18n.t('Atomic mode')
const HELPTEXT = i18n.t(
    'Controls what happens when some objects in the import are invalid. Either reject the entire import, or import the valid objects and skip the invalid ones.'
)

const AtomicMode = ({ isMetadataImport = false }) => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={
            isMetadataImport ? atomicModeMetadataOptions : atomicModeOptions
        }
        helpText={HELPTEXT}
        dataTest={DATATEST}
    />
)

AtomicMode.propTypes = {
    isMetadataImport: PropTypes.bool,
}

export { AtomicMode, defaultAtomicModeOption }
