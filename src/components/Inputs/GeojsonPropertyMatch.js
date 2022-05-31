import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF, InputFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../index'
import { OrgUnitIdScheme } from './index'

const { useField, Field } = ReactFinalForm

const MATCH_PROPERTY_NAME = 'matchProperty'
const MATCH_PROPERTY_LABEL = i18n.t(
    'Match GeoJSON property to organisation unit scheme'
)
const MATCH_PROPERTY_DATATEST = 'input-match-property'

const NAME = 'geojsonProperty'
const DATATEST = 'input-geojson-property'
const LABEL = i18n.t('GeoJSON property name')
const HELPTEXT = i18n.t(
    'GeoJSON feature property that holds the organisation unit identifier'
)

const GeojsonPropertyMatch = () => {
    const { input } = useField(MATCH_PROPERTY_NAME)
    const { value: matchProperty } = input

    return (
        <div style={{ maxWidth: '420px', paddingBottom: '16px' }}>
            <Field
                type="checkbox"
                component={CheckboxFieldFF}
                name={MATCH_PROPERTY_NAME}
                label={MATCH_PROPERTY_LABEL}
                dataTest={`${MATCH_PROPERTY_DATATEST}-sf`}
            />
            {matchProperty && (
                <div style={{ paddingTop: '16px', paddingLeft: '29px' }}>
                    <StyledField
                        type="text"
                        component={InputFieldFF}
                        name={NAME}
                        label={LABEL}
                        helpText={HELPTEXT}
                        dataTest={`${DATATEST}-sf`}
                    />
                    <OrgUnitIdScheme />
                </div>
            )}
        </div>
    )
}

export { GeojsonPropertyMatch }
