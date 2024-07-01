const dataSetQuery = {
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: 'id,displayName',
            paging: 'false',
        },
    },
}

const programQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: 'id,displayName',
            filter: 'programType:eq:WITH_REGISTRATION',
            paging: 'false',
        },
    },
}

const programWithEventsQuery = {
    programs: {
        resource: 'programs',
        params: {
            fields: 'id,displayName',
            paging: 'false',
        },
    },
}

const TETypeQuery = {
    trackedEntityTypes: {
        resource: 'trackedEntityTypes',
        params: {
            fields: 'id,displayName',
            paging: 'false',
        },
    },
}

const userQuery = {
    users: {
        resource: 'users',
        params: {
            fields: 'id,displayName',
            paging: 'false',
        },
    },
}

const geojsonAttributesQuery = {
    attributes: {
        resource: 'attributes',
        params: {
            fields: 'id,displayName',
            filter: [
                'valueType:eq:GEOJSON',
                'organisationUnitAttribute:eq:true',
            ],
            paging: 'false',
        },
    },
}

export {
    dataSetQuery,
    programQuery,
    programWithEventsQuery,
    TETypeQuery,
    userQuery,
    geojsonAttributesQuery,
}
