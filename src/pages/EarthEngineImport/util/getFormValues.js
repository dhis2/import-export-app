export const EARTH_ENGINE_ID = 'earthEngineId'
export const PERIOD = 'period'
export const ORGANISATION_UNITS = 'organisationUnits'
export const ROUNDING = 'rounding'
export const DATA_ELEMENT_ID = 'dataElementId'
export const AGGREGATION_TYPE = 'aggregationType'
export const BAND_COCS = 'bandCocs'
export const ASSOCIATED_GEOMETRY = 'associatedGeometry'

const getFormValues = (values, formFieldIds = []) => {
    /* eslint-disable no-unused-vars */
    const {
        earthEngineId,
        dataElementId,
        organisationUnits,
        rounding,
        period,
        aggregationType,
        ...bandCocs
    } = values
    /* eslint-enable no-unused-vars */

    return formFieldIds.reduce((vals, fieldId) => {
        if (fieldId === BAND_COCS) {
            return Object.assign({}, vals, bandCocs)
        }

        vals[fieldId] = values[fieldId]

        return vals
    }, {})
}

export { getFormValues }
