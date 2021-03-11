import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { ExportIcon } from '../index'
import { MenuSectionHeader } from './MenuSectionHeader'

const ExportMenuSectionHeader = () => (
    <MenuSectionHeader label={i18n.t('Export')}>
        <ExportIcon />
    </MenuSectionHeader>
)

export { ExportMenuSectionHeader }
