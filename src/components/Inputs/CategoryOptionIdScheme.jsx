import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdSchemeSelect } from '../index.js'

const defaultCategoryOptionIdSchemeOption = ''

const NAME = 'categoryOptionIdScheme'
const DATATEST = 'input-category-option-id-scheme'
const LABEL = i18n.t('Category option ID scheme')

const CategoryOptionIdScheme = () => (
    <IdSchemeSelect name={NAME} label={LABEL} dataTest={DATATEST} />
)

export { CategoryOptionIdScheme, defaultCategoryOptionIdSchemeOption }
