import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'

import { optionPropType } from '../../utils/options'
import { Select } from '../Select'
import { eventIdSchemeOptions } from '../../utils/options'

const EventIdScheme = ({ selected, setSelected, dataTest }) => {
    return (
        <Select
            name="EventIdScheme"
            label={i18n.t('Event ID scheme')}
            options={eventIdSchemeOptions}
            selected={selected}
            setValue={setSelected}
            dense
            dataTest={dataTest}
        />
    )
}

EventIdScheme.propTypes = {
    dataTest: PropTypes.string.isRequired,
    selected: optionPropType.isRequired,
    setSelected: PropTypes.func.isRequired,
}

export { EventIdScheme }
