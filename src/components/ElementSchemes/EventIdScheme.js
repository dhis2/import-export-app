import React from 'react'
import PropTypes from 'prop-types'
import { SingleSelectFieldFF } from '@dhis2/ui'

import { StyledField } from '../index'
import { optionsPropType } from '../../utils/options'

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
