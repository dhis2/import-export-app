import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { optionPropType } from '../../utils/options'
import { SchemeContext } from '../../contexts/'
import { Select } from '../Select'

const OrgUnitIdScheme = ({ selected, setSelected, dataTest }) => {
    const { OrgUnitId } = useContext(SchemeContext)
    return (
        <Select
            name="OrgUnitIdScheme"
            label={i18n.t('Organisation unit ID scheme')}
            options={OrgUnitId}
            selected={selected}
            setValue={setSelected}
            dense
            dataTest={dataTest}
        />
    )
}

OrgUnitIdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: optionPropType.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export { OrgUnitIdScheme }
