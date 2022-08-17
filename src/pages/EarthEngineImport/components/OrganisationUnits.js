import { OrgUnitDimension } from '@dhis2/analytics'
import i18n from '@dhis2/d2-i18n'
import {
    ReactFinalForm,
    ComponentCover,
    CenteredContent,
    CircularLoader,
    Help,
    hasValue,
    composeValidators,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { FormField } from '../../../components/index.js'
import { useCachedDataQuery } from '../util/CachedQueryProvider.js'

const { Field } = ReactFinalForm

const Wrapper = ({ input: { value, onChange }, meta }) => {
    const { rootOrgUnits } = useCachedDataQuery()
    const error = null //TODO - should be error from failed org units query

    return (
        <>
            {!rootOrgUnits && (
                <ComponentCover>
                    <CenteredContent>
                        <CircularLoader />
                    </CenteredContent>
                </ComponentCover>
            )}
            {error && (
                <Help error>
                    {i18n.t(
                        'Something went wrong when loading the organisation units!'
                    )}
                </Help>
            )}
            {rootOrgUnits && (
                <div>
                    <OrgUnitDimension
                        roots={rootOrgUnits}
                        selected={value}
                        onSelect={({ items }) => onChange(items)}
                        showUserOrgUnits={false}
                    />
                </div>
            )}

            {(meta.touched || !meta.pristine) && meta.error && (
                <Help error>{meta.error}</Help>
            )}
        </>
    )
}

Wrapper.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.object).isRequired,
        onChange: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
}

const AT_LEAST_ONE_ORG_VALIDATOR = (selectedOrgUnits) => {
    // confirm that there is at least one org unit from the tree, not just level
    const realOrgUnits =
        selectedOrgUnits.find((ou) => ou.id.indexOf('LEVEL') === -1) || []

    return realOrgUnits.length == 0
        ? i18n.t('At least one organisation unit must be selected')
        : undefined
}

const OrganisationUnits = () => {
    const validator = composeValidators(hasValue, AT_LEAST_ONE_ORG_VALIDATOR)

    return (
        <FormField
            label={i18n.t('Organisation unit(s) to import data to')}
            dataTest="input-organisationUnits-formField"
        >
            <Field
                component={Wrapper}
                name="organisationUnits"
                validate={validator}
            />
        </FormField>
    )
}

export { OrganisationUnits }
