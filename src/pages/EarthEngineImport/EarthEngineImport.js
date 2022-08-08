import React from 'react'
import { EarthEngineImportForm } from './EarthEngineImportForm.js'
import { CachedDataQueryProvider } from './util/CachedQueryProvider.js'

const query = {
    rootOrgUnits: {
        resource: 'organisationUnits',
        params: {
            fields: 'id,displayName,name',
            userDataViewFallback: true,
            paging: false,
        },
    },
    dataElements: {
        resource: 'dataElements',
        params: {
            fields: 'id,displayName~rename(name),categoryCombo[categoryOptionCombos[id,displayName~rename(name)]],dataElementGroups',
            filter: 'domainType:eq:AGGREGATE',
            paging: false,
        },
    },
}

const providerDataTransformation = ({ rootOrgUnits, dataElements }) => {
    return {
        rootOrgUnits: rootOrgUnits.organisationUnits?.map((ou) => ou.id) || [],
        dataElements: dataElements.dataElements.map((de) => {
            return {
                ...de,
                value: de.id,
                label: de.name,
            }
        }),
    }
}

const EarthEngineImport = () => {
    return (
        <div>
            <CachedDataQueryProvider
                query={query}
                dataTransformation={providerDataTransformation}
            >
                <EarthEngineImportForm />
            </CachedDataQueryProvider>
        </div>
    )
}

export { EarthEngineImport }
