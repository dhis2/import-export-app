import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'
import { ROUNDING } from '../util/formFieldConstants.js'

const roundings = [
    {
        label: i18n.t("Don't round source values"),
        value: '-1',
    },
    {
        label: i18n.t('Round to 0 decimal places'),
        value: '0',
    },
    {
        label: i18n.t('Round to 1 decimal place'),
        value: '1',
    },
    {
        label: i18n.t('Round to 2 decimal places'),
        value: '2',
    },
    {
        label: i18n.t('Round to 3 decimal places'),
        value: '3',
    },
    {
        label: i18n.t('Round to 4 decimal places'),
        value: '4',
    },
    {
        label: i18n.t('Round to 5 decimal places'),
        value: '5',
    },
    {
        label: i18n.t('Round to 6 decimal places'),
        value: '6',
    },
]

const defaultRoundingOption = roundings[0].value

const Rounding = () => (
    <div style={{ maxWidth: '300px' }}>
        <StyledField
            component={SingleSelectFieldFF}
            name={ROUNDING}
            label={i18n.t('Value rounding')}
            options={roundings}
            dataTest="input-rounding"
            filled
        />
    </div>
)

export { Rounding, defaultRoundingOption }
