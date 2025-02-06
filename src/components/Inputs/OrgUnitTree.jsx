import i18n from '@dhis2/d2-i18n'
import { hasValue, composeValidators } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { OrgUnitTreeField, FormField } from '../index.js'
import {
    SINGLE_ORG_VALIDATOR,
    SINGLE_EXACT_ORG_VALIDATOR,
} from '../OrgUnitTree/OrgUnitTreeField.jsx'

const NAME = 'selectedOrgUnits'
const LABEL = i18n.t('Organisation unit(s) to export data from')
const DATATEST = 'input-org-unit-tree'

const OrgUnitTree = ({ multiSelect }) => {
    const orgValidator = multiSelect
        ? SINGLE_ORG_VALIDATOR
        : SINGLE_EXACT_ORG_VALIDATOR
    const validator = composeValidators(hasValue, orgValidator)

    return (
        <FormField label={LABEL} dataTest={DATATEST}>
            <OrgUnitTreeField
                name={NAME}
                validator={validator}
                multiSelect={multiSelect}
                label={LABEL}
                dataTest={DATATEST}
            />
        </FormField>
    )
}

OrgUnitTree.defaultProps = {
    multiSelect: true,
}

OrgUnitTree.propTypes = {
    multiSelect: PropTypes.bool,
}

export { OrgUnitTree }
