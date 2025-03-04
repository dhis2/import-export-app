import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { UserContext } from '../../contexts/index.js'
import { RadioGroupField } from '../index.js'
import { hasAuthorityToSelectAllOrgUnits } from '../WithAuthority/predicates.js'
import { OrgUnitTree, Inclusion } from './index.js'

const OU_MODE_MANUAL_VALUE = ':MANUAL:'
const orgUnitSelectionModeOptions = [
    {
        value: 'ACCESSIBLE',
        label: i18n.t(
            'Data view organisation units associated with the current user'
        ),
        prefix: i18n.t('Accessible'),
    },
    {
        value: 'CAPTURE',
        label: i18n.t(
            'Data capture organisation units associated with the current user'
        ),
        prefix: i18n.t('Capture'),
    },
    {
        value: 'ALL',
        label: i18n.t('All organisation units in the system'),
        prefix: i18n.t('All'),
    },
    {
        value: OU_MODE_MANUAL_VALUE,
        label: i18n.t('Manually select organisation units from list'),
    },
]
const defaultOrgUnitSelectionModeOption = orgUnitSelectionModeOptions[3].value

const NAME = 'orgUnitMode'
const DATATEST = 'input-orgUnitMode'
const LABEL = i18n.t('Which organisation units should be included?')

const OrgUnitMode = ({ value }) => {
    const user = useContext(UserContext)
    const canSelectAllOrgUnits = user
        ? hasAuthorityToSelectAllOrgUnits(user.authorities)
        : false
    const options = canSelectAllOrgUnits
        ? orgUnitSelectionModeOptions
        : orgUnitSelectionModeOptions.filter(({ value }) => value != 'ALL')

    return (
        <RadioGroupField
            name={NAME}
            label={LABEL}
            options={options}
            dataTest={DATATEST}
            vertical
        >
            {value === OU_MODE_MANUAL_VALUE && (
                <>
                    <OrgUnitTree />
                    <Inclusion />
                </>
            )}
        </RadioGroupField>
    )
}

OrgUnitMode.propTypes = {
    value: PropTypes.string.isRequired,
}

export { OrgUnitMode, defaultOrgUnitSelectionModeOption, OU_MODE_MANUAL_VALUE }
