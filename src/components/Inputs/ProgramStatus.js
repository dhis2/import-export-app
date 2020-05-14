import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { RadioGroupField } from '../'
import { programStatusOptions } from '../../utils/options'

const NAME = 'programStatus'
const DATATEST = 'input-program-status'
const LABEL = i18n.t('Program status')

const ProgramStatus = () => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={programStatusOptions}
        dataTest={DATATEST}
    />
)

export { ProgramStatus }
