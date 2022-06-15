import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import {
    CircularLoader,
    Help,
    ReactFinalForm,
    OrganisationUnitTree,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './OrgUnitTreeField.module.css'
const { Field } = ReactFinalForm

const rootQuery = {
    roots: {
        resource: 'organisationUnits',
        params: {
            filter: 'level:eq:1',
            fields: 'id',
            paging: 'false',
        },
    },
}

const SINGLE_ORG_VALIDATOR = (selectedOrgUnits) =>
    selectedOrgUnits.length == 0
        ? i18n.t('At least one organisation unit must be selected')
        : undefined

const SINGLE_EXACT_ORG_VALIDATOR = (selectedOrgUnits) =>
    selectedOrgUnits.length != 1
        ? i18n.t('One organisation unit must be selected')
        : undefined

const Wrapper = ({
    input: { value, onChange },
    meta,
    multiSelect,
    ...rest
}) => {
    const { loading, data, error } = useDataQuery(rootQuery)

    return (
        <>
            {loading && <CircularLoader />}
            {error && (
                <Help error>
                    {i18n.t(
                        'Something went wrong when loading the organisation units!'
                    )}
                </Help>
            )}
            {data && (
                <div className={styles.wrapper}>
                    <OrganisationUnitTree
                        onChange={({ selected }) => {
                            onChange(selected)
                        }}
                        selected={value}
                        roots={data.roots.organisationUnits.map((ou) => ou.id)}
                        {...rest}
                        singleSelection={!multiSelect}
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
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
    }).isRequired,
    multiSelect: PropTypes.bool,
}

const OrgUnitTreeField = ({ name, validator, ...rest }) => {
    return (
        <Field component={Wrapper} name={name} validate={validator} {...rest} />
    )
}

OrgUnitTreeField.propTypes = {
    name: PropTypes.string.isRequired,
    validator: PropTypes.func,
}

export { OrgUnitTreeField, SINGLE_ORG_VALIDATOR, SINGLE_EXACT_ORG_VALIDATOR }
