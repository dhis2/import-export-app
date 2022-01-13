import i18n from '@dhis2/d2-i18n'
import { SingleSelect, SingleSelectOption } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import NumberField from './NumberField'
import styles from './styles/NumberPrecision.module.css'

const ORIGINAL = 'original'
const CUSTOM = 'custom'

const NumberPrecision = ({ precision, onChange }) => {
    const [useOriginal, setUseOriginal] = useState(precision === undefined)

    const precisionChanged = ({ selected }) => {
        setUseOriginal(selected === ORIGINAL)
        onChange(selected === ORIGINAL ? undefined : 0)
    }

    return (
        <div className={styles.row}>
            <SingleSelect
                label={i18n.t('Number precision')}
                selected={useOriginal ? ORIGINAL : CUSTOM}
                onChange={precisionChanged}
                className={styles.select}
            >
                <SingleSelectOption
                    label={i18n.t('Use original value')}
                    key="original"
                    value="original"
                />
                <SingleSelectOption
                    label={i18n.t('Custom value')}
                    key="custom"
                    value="custom"
                />
            </SingleSelect>
            <NumberField
                label={i18n.t('Decimals')}
                value={useOriginal ? undefined : precision}
                onChange={num => {
                    setUseOriginal(num === '')
                    onChange(num === '' ? undefined : Number(num))
                }}
                min={0}
                dense
            />
        </div>
    )
}

NumberPrecision.propTypes = {
    onChange: PropTypes.func.isRequired,
    precision: PropTypes.number,
}

export default NumberPrecision
