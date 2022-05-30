import i18n from '@dhis2/d2-i18n'
import { InputFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../index'

const NAME = 'geojsonProperty'
const DATATEST = 'input-geojson-property'
const LABEL = i18n.t('GeoJSON property name')
const HELPTEXT = i18n.t(
    'GeoJSON feature property that holds the organisation unit identifier'
)

const GeojsonProperty = () => (
    <StyledField
        type="text"
        component={InputFieldFF}
        name={NAME}
        label={LABEL}
        helpText={HELPTEXT}
        dataTest={`${DATATEST}-sf`}
    />
)

export { GeojsonProperty }
