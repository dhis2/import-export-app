import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { OrgUnitIdScheme as OrgUnitIdSchemeGeneric } from '../ElementSchemes'

const NAME = 'orgUnitIdScheme'
const DATATEST = 'input-org-unit-id-scheme'
const LABEL = i18n.t('Organisation unit ID scheme')

const OrgUnitIdScheme = () => (
    <OrgUnitIdSchemeGeneric name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { OrgUnitIdScheme }
