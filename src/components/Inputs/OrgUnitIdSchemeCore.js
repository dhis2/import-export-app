import i18n from '@dhis2/d2-i18n'
import { SingleSelectFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../index.js'

const orgUnitIdSchemeOptions = [
    { value: 'ID', label: i18n.t('Id') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]
const defaultOrgUnitIdSchemeCoreOption = orgUnitIdSchemeOptions[0].value

const NAME = 'orgUnitIdSchemeCore'
const DATATEST = 'input-org-unit-id-scheme-core'
const LABEL = i18n.t('Organisation unit ID scheme')

const OrgUnitIdSchemeCore = () => (
    <StyledField
        component={SingleSelectFieldFF}
        name={NAME}
        label={LABEL}
        options={orgUnitIdSchemeOptions}
        dataTest={DATATEST}
    />
)

export { OrgUnitIdSchemeCore, defaultOrgUnitIdSchemeCoreOption }
