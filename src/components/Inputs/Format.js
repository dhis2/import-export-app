import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../RadioGroup'
import { optionsPropType } from '../../utils/options'

const NAME = 'format'
const DATATEST = 'input-format'
const LABEL = i18n.t('Format')

const Format = ({ availableFormats }) => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={availableFormats}
        dataTest={DATATEST}
    />
)

Format.propTypes = {
    availableFormats: optionsPropType.isRequired,
}

export { Format }
