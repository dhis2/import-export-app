import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { MenuSectionHeader } from './MenuSectionHeader'
import { ImportIcon } from '../index'

const ImportMenuSectionHeader = () => (
    <MenuSectionHeader label={i18n.t('Import')}>
        <ImportIcon />
    </MenuSectionHeader>
)

export { ImportMenuSectionHeader }
