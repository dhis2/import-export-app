import { SingleSelectFieldFF } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { optionsPropType } from '../../utils/options.js'
import { StyledField } from '../index.js'

const EventIdScheme = ({ name, label, eventIdSchemeOptions, dataTest }) => {
    return (
        <StyledField
            component={SingleSelectFieldFF}
            name={name}
            label={label}
            options={eventIdSchemeOptions}
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
