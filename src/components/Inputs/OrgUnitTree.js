import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui-forms'
import { OrgUnitTreeField } from '../index'
import {
    SINGLE_ORG_VALIDATOR,
    SINGLE_EXACT_ORG_VALIDATOR,
} from '../OrgUnitTree/OrgUnitTreeField'

const NAME = 'selectedOrgUnits'
const LABEL = i18n.t('Organisation unit')
const DATATEST = 'input-org-unit-tree'

const OrgUnitTree = ({ multiSelect = true }) => {
    const orgValidator = multiSelect
        ? SINGLE_ORG_VALIDATOR
        : SINGLE_EXACT_ORG_VALIDATOR
    const validator = composeValidators(hasValue, orgValidator)

    return (
        <OrgUnitTreeField
            name={NAME}
            validator={validator}
            multiSelect={multiSelect}
            label={LABEL}
            dataTest={DATATEST}
        />
    )
}

OrgUnitTree.propTypes = {
    multiSelect: PropTypes.bool,
}

export { OrgUnitTree }
