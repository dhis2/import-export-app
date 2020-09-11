import React from 'react'
import i18n from '@dhis2/d2-i18n'

import { MenuSectionHeader } from './MenuSectionHeader'
import { ExportIcon } from '../index'

const ExportMenuSectionHeader = () => (
    <MenuSectionHeader label={i18n.t('Export')}>
        <ExportIcon />
    </MenuSectionHeader>
)

export { ExportMenuSectionHeader }
