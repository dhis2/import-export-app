import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CategoryOptionIdScheme as CategoryOptionIdSchemeGeneric } from '../index.js'

const categoryOptionIdSchemeOptions = [
    { value: '', label: i18n.t('(Default)') },
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]
const defaultCategoryOptionIdSchemeOption =
    categoryOptionIdSchemeOptions[0].value

const NAME = 'categoryOptionIdScheme'
const DATATEST = 'input-category-option-id-scheme'
const LABEL = i18n.t('Category option ID scheme')

const CategoryOptionIdScheme = () => (
    <CategoryOptionIdSchemeGeneric
        name={NAME}
        label={LABEL}
        categoryOptionIdSchemeOptions={categoryOptionIdSchemeOptions}
        dataTest={DATATEST}
    />
)

export { CategoryOptionIdScheme, defaultCategoryOptionIdSchemeOption }
