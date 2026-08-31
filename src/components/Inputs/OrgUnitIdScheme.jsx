import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdSchemeSelect } from '../index.js'

const defaultOrgUnitIdSchemeOption = 'UID'

const NAME = 'orgUnitIdScheme'
const DATATEST = 'input-org-unit-id-scheme'
const LABEL = i18n.t('Organisation unit ID scheme')
const ATTRIBUTE_TYPES = ['organisationUnitAttribute']

const OrgUnitIdScheme = () => (
    <IdSchemeSelect
        name={NAME}
        label={LABEL}
        dataTest={DATATEST}
        attributeTypes={ATTRIBUTE_TYPES}
    />
)

export { OrgUnitIdScheme, defaultOrgUnitIdSchemeOption }
