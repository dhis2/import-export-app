import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CategoryOptionComboIdScheme as CategoryOptionComboIdSchemeGeneric } from '../index.js'

const categoryOptionComboIdSchemeOptions = [
    { value: '', label: i18n.t('(Default)') },
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]
const defaultCategoryOptionComboIdSchemeOption =
    categoryOptionComboIdSchemeOptions[0].value

const NAME = 'categoryOptionComboIdScheme'
const DATATEST = 'input-category-option-combo-id-scheme'
const LABEL = i18n.t('Category option combo ID scheme')

const CategoryOptionComboIdScheme = () => (
    <CategoryOptionComboIdSchemeGeneric
        name={NAME}
        label={LABEL}
        categoryOptionComboIdSchemeOptions={categoryOptionComboIdSchemeOptions}
        dataTest={DATATEST}
    />
)

export { CategoryOptionComboIdScheme, defaultCategoryOptionComboIdSchemeOption }
