import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../../../components/index.js'

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

// Returns a function that will return a value with the given precision
const getPrecisionFn = (numDecimals) => {
    const decimals = parseInt(numDecimals)
    if (decimals === -1) {
        return (n) => n
    }
    const m = Math.pow(10, decimals)
    return (n) => Math.round(n * m) / m
}

const Rounding = () => (
    <div style={{ maxWidth: '300px' }}>
        <StyledField
            component={SingleSelectFieldFF}
            name="rounding"
            label={i18n.t('Value rounding')}
            options={roundings}
            dataTest="input-rounding"
            filled
            initialFocus
        />
    </div>
)

export { Rounding, getPrecisionFn, defaultRoundingOption }
