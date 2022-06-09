import i18n from '@dhis2/d2-i18n'

const getRoundings = () => {
    return [
        {
            label: i18n.t("Don't round source values"),
            value: 'noround',
            rValue: undefined,
        },
        {
            label: i18n.t('Round to 0 decimal places'),
            value: 'round0',
            rValue: 0,
        },
        {
            label: i18n.t('Round to 1 decimal place'),
            value: 'round1',
            rValue: 1,
        },
        {
            label: i18n.t('Round to 2 decimal places'),
            value: 'round2',
            rValue: 2,
        },
        {
            label: i18n.t('Round to 3 decimal places'),
            value: 'round3',
            rValue: 3,
        },
        {
            label: i18n.t('Round to 4 decimal places'),
            value: 'round4',
            rValue: 4,
        },
        {
            label: i18n.t('Round to 5 decimal places'),
            value: 'round5',
            rValue: 5,
        },
        {
            label: i18n.t('Round to 6 decimal places'),
            value: 'round6',
            rValue: 6,
        },
    ]
}

const getPrecision = rounding =>
    getRoundings().find(r => r.value === rounding).rValue

export { getRoundings, getPrecision }
