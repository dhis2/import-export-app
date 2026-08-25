import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { CategoryIdScheme as CategoryIdSchemeGeneric } from '../index.js'

const categoryIdSchemeOptions = [
    { value: '', label: i18n.t('(Default)') },
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
    { value: 'NAME', label: i18n.t('Name') },
]
const defaultCategoryIdSchemeOption = categoryIdSchemeOptions[0].value

const NAME = 'categoryIdScheme'
const DATATEST = 'input-category-id-scheme'
const LABEL = i18n.t('Category ID scheme')

const CategoryIdScheme = () => (
    <CategoryIdSchemeGeneric
        name={NAME}
        label={LABEL}
        categoryIdSchemeOptions={categoryIdSchemeOptions}
        dataTest={DATATEST}
    />
)

export { CategoryIdScheme, defaultCategoryIdSchemeOption }
