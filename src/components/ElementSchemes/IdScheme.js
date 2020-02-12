import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { idSchemeOptions, optionPropType } from '../../utils/options'
import { SchemeContext } from '../../contexts/'
import { Select } from '../Select'

const attributeFoundIn = (attribute, collection) =>
    !!collection.find(({ value }) => value === attribute.value)

const IdScheme = ({ selected, setSelected, dataTest }) => {
    const { Id, OrgUnitId, DataElementId, updateSchema } = useContext(
        SchemeContext
    )

    useEffect(() => {
        if (OrgUnitId.loaded && DataElementId.loaded) {
            const sharedAttributes = DataElementId.options.reduce(
                (shared, attribute) => {
                    const foundInOrgUnits = attributeFoundIn(
                        attribute,
                        OrgUnitId.options
                    )
                    return foundInOrgUnits ? [...shared, attribute] : shared
                },
                []
            )

            updateSchema('Id', {
                options: sharedAttributes,
                loaded: true,
                error: false,
            })
        }
    }, [OrgUnitId, DataElementId])

    const options = [...idSchemeOptions, ...Id.options]
    return (
        <Select
            name="IdScheme"
            label={i18n.t('ID scheme')}
            options={options}
            selected={selected}
            setValue={setSelected}
            dataTest={dataTest}
            loading={!Id.loaded}
            dense
        />
    )
}

IdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: optionPropType.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export { IdScheme }
