import React, { useContext } from 'react'
import i18n from '@dhis2/d2-i18n'
import { UserContext } from '../../contexts/'
import { hasAuthorityToSelectAllOrgUnits } from '../WithAuthority/predicates'
import { orgUnitSelectionModeOptions } from '../../utils/options'
import { RadioGroupField } from '../'

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

export { OrgUnitMode }
