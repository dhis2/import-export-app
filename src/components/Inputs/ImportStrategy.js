import i18n from '@dhis2/d2-i18n'
import { NoticeBox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { RadioGroupField } from '../index.js'

const importStrategyOptions = [
    {
        value: 'CREATE_AND_UPDATE',
        label: i18n.t('Import new values and update existing'),
        prefix: i18n.t('Merge'),
    },
    {
        value: 'CREATE',
        label: i18n.t('Import new values only'),
        prefix: i18n.t('Append'),
    },
    {
        value: 'UPDATE',
        label: i18n.t('Only update existing values, ignore new values'),
        prefix: i18n.t('Update'),
    },
    {
        value: 'DELETE',
        label: i18n.t('Remove values included in uploaded file'),
        prefix: i18n.t('Delete'),
        type: 'critical',
    },
]
const defaultImportStrategyOption = importStrategyOptions[0].value

const DELETE_WARNING_TITLE = i18n.t('Data will be deleted')
const DELETE_WARNING = i18n.t(
    'Values in the uploaded file will be deleted from the database. Make sure this is the correct action; it cannot be undone.'
)

const NAME = 'importStrategy'
const DATATEST = 'input-import-strategy'
const LABEL = i18n.t('Import strategy')

const ImportStrategy = ({ value }) => (
    <RadioGroupField
        name={NAME}
        label={LABEL}
        options={importStrategyOptions}
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

ImportStrategy.propTypes = {
    value: PropTypes.string.isRequired,
}

export { ImportStrategy, defaultImportStrategyOption }
