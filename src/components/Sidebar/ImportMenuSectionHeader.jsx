import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { ImportIcon } from '../index.js'
import { MenuSectionHeader } from './MenuSectionHeader.jsx'

const ImportMenuSectionHeader = () => (
    <MenuSectionHeader label={i18n.t('Import')}>
        <ImportIcon />
    </MenuSectionHeader>
)

export { ImportMenuSectionHeader }
