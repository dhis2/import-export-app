import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { EventIdScheme as EventIdSchemeGeneric } from '../index.js'

const eventIdSchemeOptions = [
    { value: 'UID', label: i18n.t('Uid') },
    { value: 'CODE', label: i18n.t('Code') },
]
const defaultEventIdSchemeOption = eventIdSchemeOptions[0].value

const NAME = 'eventIdScheme'
const DATATEST = 'input-event-id-scheme'
const LABEL = i18n.t('Event ID scheme')

const EventIdScheme = () => (
    <EventIdSchemeGeneric
        name={NAME}
        label={LABEL}
        eventIdSchemeOptions={eventIdSchemeOptions}
        dataTest={DATATEST}
    />
)

export { EventIdScheme, defaultEventIdSchemeOption }
