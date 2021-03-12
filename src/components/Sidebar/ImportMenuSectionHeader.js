import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { ImportIcon } from '../index'
import { MenuSectionHeader } from './MenuSectionHeader'

const ImportMenuSectionHeader = () => (
    <MenuSectionHeader label={i18n.t('Import')}>
        <ImportIcon />
    </MenuSectionHeader>
)

export { ImportMenuSectionHeader }
