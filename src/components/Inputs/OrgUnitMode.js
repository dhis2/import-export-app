import React, { useContext } from 'react'
import i18n from '@dhis2/d2-i18n'
import { UserContext } from '../../contexts/'
import { hasAuthorityToSelectAllOrgUnits } from '../WithAuthority/predicates'
import { RadioGroupField } from '../'

const orgUnitSelectionModeOptions = [
    {
        value: 'SELECTED',
        label: i18n.t('Selected organisation units'),
    },
    {
        value: 'CHILDREN',
        label: i18n.t('Include children of selected organisation units'),
    },
    {
        value: 'DESCENDANTS',
        label: i18n.t('Include descendants of selected organisation unit'),
    },
    {
        value: 'ACCESSIBLE',
        label: i18n.t(
            'Data view organisation units associated with the current user'
        ),
    },
    {
        value: 'CAPTURE',
        label: i18n.t(
            'Data capture organisation units associated with the current user'
        ),
    },
    {
        value: 'ALL',
        label: i18n.t('All organisation units in the system'),
    },
]
const defaultOrgUnitSelectionModeOption = orgUnitSelectionModeOptions[0]

const NAME = 'ouMode'
const DATATEST = 'input-ouMode'
const LABEL = i18n.t('Organisation unit selection mode')

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
