import i18n from '@dhis2/d2-i18n'
import { ReactFinalForm, CheckboxFieldFF, InputFieldFF } from '@dhis2/ui'
import React from 'react'
import { StyledField } from '../index.js'
import { OrgUnitIdSchemeCore } from '../Inputs/index.js'
import styles from './GeometryPropertyMatch.module.css'

const { useField, Field } = ReactFinalForm

const MATCH_PROPERTY_NAME = 'matchProperty'
const MATCH_PROPERTY_LABEL = i18n.t(
    'Match GeoJSON property to organisation unit scheme'
)
const MATCH_PROPERTY_DATATEST = 'input-match-property'

const NAME = 'geojsonProperty'
const DATATEST = 'input-geometry-property'
const LABEL = i18n.t('GeoJSON property name')
const HELPTEXT = i18n.t(
    'GeoJSON feature property that holds the organisation unit identifier'
)

const GeometryPropertyMatch = () => {
    const { input } = useField(MATCH_PROPERTY_NAME)
    const { value: matchProperty } = input

    return (
        <div className={styles.container}>
            <Field
                type="checkbox"
                component={CheckboxFieldFF}
                name={MATCH_PROPERTY_NAME}
                label={MATCH_PROPERTY_LABEL}
                dataTest={`${MATCH_PROPERTY_DATATEST}-sf`}
            />
            {matchProperty && (
                <div className={styles.indent}>
                    <StyledField
                        type="text"
                        component={InputFieldFF}
                        name={NAME}
                        label={LABEL}
                        helpText={HELPTEXT}
                        dataTest={`${DATATEST}-sf`}
                    />
                    <OrgUnitIdSchemeCore />
                </div>
            )}
        </div>
    )
}

export { GeometryPropertyMatch }
