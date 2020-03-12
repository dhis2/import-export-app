import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../RadioGroup'
import { optionsPropType } from '../../utils/options'

const NAME = 'compression'
const DATATEST = 'input-compression'
const LABEL = i18n.t('Compression')

const Compression = ({ availableCompressions }) => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={availableCompressions}
        dataTest={DATATEST}
    />
)

Compression.propTypes = {
    availableCompressions: optionsPropType.isRequired,
}

export { Compression }
