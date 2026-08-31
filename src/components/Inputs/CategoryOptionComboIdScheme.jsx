import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdSchemeSelect } from '../index.js'

const defaultCategoryOptionComboIdSchemeOption = ''

const NAME = 'categoryOptionComboIdScheme'
const DATATEST = 'input-category-option-combo-id-scheme'
const LABEL = i18n.t('Category option combo ID scheme')

const CategoryOptionComboIdScheme = () => (
    <IdSchemeSelect name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { CategoryOptionComboIdScheme, defaultCategoryOptionComboIdSchemeOption }
