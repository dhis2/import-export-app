import React from 'react'
import PropTypes from 'prop-types'

import { SelectField } from '../'
import { eventIdSchemeOptions } from '../../utils/options'

const EventIdScheme = ({ name, label, dataTest }) => {
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
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export { EventIdScheme }
