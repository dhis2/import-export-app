import React, { useContext } from 'react'
import i18n from '@dhis2/d2-i18n'
import { UserContext } from '../../contexts/index'
import { hasAuthorityToSelectAllOrgUnits } from '../WithAuthority/predicates'
import { RadioGroupField } from '../index'

const orgUnitSelectionModeOptions = [
    {
        value: 'SELECTED',
        label: i18n.t('Only include selected organisation unit'),
        prefix: i18n.t('Selected'),
    },
    {
        value: 'CHILDREN',
        label: i18n.t('Include the first level of units inside selections'),
        prefix: i18n.t('Directly below'),
    },
    {
        value: 'DESCENDANTS',
        label: i18n.t('Include all units inside selections'),
        prefix: i18n.t('All below'),
    },
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
]
const defaultOrgUnitSelectionModeOption = orgUnitSelectionModeOptions[0].value

const NAME = 'ouMode'
const DATATEST = 'input-ouMode'
const LABEL = i18n.t(
    'How should organisation units inside the selections be included?'
)

const OrgUnitMode = () => {
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
        />
    )
}

export { OrgUnitMode, defaultOrgUnitSelectionModeOption }
