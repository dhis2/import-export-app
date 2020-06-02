import React from 'react'
import PropTypes from 'prop-types'

import { optionsPropType } from '../../utils/options'
import { SelectField } from '../'

const EventIdScheme = ({ name, label, eventIdSchemeOptions, dataTest }) => {
    return (
        <SelectField
            name={name}
            label={label}
            options={eventIdSchemeOptions}
            dense
            dataTest={dataTest}
        />
    )
}

EventIdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    eventIdSchemeOptions: optionsPropType.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export { EventIdScheme }
