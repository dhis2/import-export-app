import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { OrgUnitIdScheme as OrgUnitIdSchemeGeneric } from '../index'

const orgUnitIdSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]
const defaultOrgUnitIdSchemeOption = orgUnitIdSchemeOptions[0]

const NAME = 'orgUnitIdScheme'
const DATATEST = 'input-org-unit-id-scheme'
const LABEL = i18n.t('Organisation unit ID scheme')

const OrgUnitIdScheme = () => (
    <OrgUnitIdSchemeGeneric
        name={NAME}
        label={LABEL}
        orgUnitIdSchemeOptions={orgUnitIdSchemeOptions}
        dataTest={DATATEST}
    />
)

export { OrgUnitIdScheme, defaultOrgUnitIdSchemeOption }
