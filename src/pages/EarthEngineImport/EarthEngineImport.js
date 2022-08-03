import React from 'react'
import { EarthEngineImportForm } from './EarthEngineImportForm.js'
import { CachedDataQueryProvider } from './util/CachedQueryProvider.js'

export const DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY =
    'DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY'

const query = {
    userSettings: {
        resource: 'userSettings',
        params: {
            key: 'keyAnalysisDisplayProperty',
        },
    },
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

const providerDataTransformation = ({
    userSettings,
    rootOrgUnits,
    dataElements,
}) => {
    return {
        displayProperty: userSettings.keyAnalysisDisplayProperty,
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
