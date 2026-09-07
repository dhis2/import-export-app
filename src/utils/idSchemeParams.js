// ID scheme URL parameters each endpoint accepts, in query-string order.
const ID_SCHEME_PARAMS_BY_ENDPOINT = {
    dataValueSets: [
        'dataElementIdScheme',
        'orgUnitIdScheme',
        'idScheme',
        'categoryIdScheme',
        'categoryOptionIdScheme',
        'categoryOptionComboIdScheme',
        'dataSetIdScheme',
        'attributeOptionComboIdScheme',
    ],
    tracker: ['dataElementIdScheme', 'orgUnitIdScheme', 'idScheme'],
}

// `[key, value]` pairs for the given endpoint, skipping schemes left at
// "(Default)" (empty value) so the server applies its own default.
const idSchemeEntries = (values, endpoint) =>
    ID_SCHEME_PARAMS_BY_ENDPOINT[endpoint]
        .filter((key) => values[key])
        .map((key) => [key, values[key]])

const idSchemeParams = (values, endpoint) =>
    idSchemeEntries(values, endpoint).map(([key, value]) => `${key}=${value}`)

export { ID_SCHEME_PARAMS_BY_ENDPOINT, idSchemeEntries, idSchemeParams }
