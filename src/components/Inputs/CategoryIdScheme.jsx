import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { IdSchemeSelect } from '../index.js'

const defaultCategoryIdSchemeOption = ''

const NAME = 'categoryIdScheme'
const DATATEST = 'input-category-id-scheme'
const LABEL = i18n.t('Category ID scheme')
const ATTRIBUTE_TYPES = ['categoryAttribute']

const CategoryIdScheme = () => (
    <IdSchemeSelect
        name={NAME}
        label={LABEL}
        dataTest={DATATEST}
        attributeTypes={ATTRIBUTE_TYPES}
    />
)

export { CategoryIdScheme, defaultCategoryIdSchemeOption }
