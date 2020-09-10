import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import { RadioGroupField } from '../index'

const strategyOptions = [
    {
        value: 'NEW_AND_UPDATES',
        label: i18n.t('MERGE: Import new values and update existing'),
    },
    {
        value: 'NEW',
        label: i18n.t('APPEND: Import new values only'),
    },
    {
        value: 'UPDATES',
        label: i18n.t('UPDATE: Only update existing values, ignore new values'),
    },
    {
        value: 'DELETE',
        label: i18n.t('DELETE: Remove values included in uploaded file'),
    },
]
const defaultStrategyOption = strategyOptions[0].value

const DELETE_WARNING_TITLE = i18n.t('Data will be deleted')
const DELETE_WARNING = i18n.t(
    'Values in the uploaded file will be deleted from the database. Make sure this is the correct action; it cannot be undone.'
)

const NAME = 'strategy'
const DATATEST = 'input-strategy'
const LABEL = i18n.t('Strategy')

const Strategy = ({ value }) => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={strategyOptions}
        dataTest={DATATEST}
        vertical
    >
        {value === 'DELETE' && (
            <NoticeBox title={DELETE_WARNING_TITLE} warning>
                {DELETE_WARNING}
            </NoticeBox>
        )}
    </RadioGroupField>
)

Strategy.propTypes = {
    value: PropTypes.string.isRequired,
}

export { Strategy, defaultStrategyOption }
