import React from 'react'
import { EarthEngineImportForm } from './components/EarthEngineImportForm.js'
import { CachedDataQueryProvider } from './util/CachedQueryProvider.js'

export const USER_SETTINGS_DISPLAY_PROPERTY = 'keyAnalysisDisplayProperty'

export const DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY =
    'DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY'

const query = {
    userSettings: {
        resource: 'userSettings',
        params: {
            key: [USER_SETTINGS_DISPLAY_PROPERTY],
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
            fields: 'id,displayName~rename(name),categoryCombo[categoryOptionCombos[id,displayName~rename(name)]]',
            filter: 'domainType:eq:AGGREGATE',
            paging: false,
        },
    },
    dataElementGroups: {
        resource: 'dataElementGroups',
        params: {
            fields: 'id,displayName~rename(name)',
            paging: false,
        },
    },
}

const providerDataTransformation = ({
    userSettings,
    rootOrgUnits,
    dataElements,
    dataElementGroups,
}) => {
    return {
        userSettings: {
            ...userSettings,
            [DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY]:
                userSettings[USER_SETTINGS_DISPLAY_PROPERTY] === 'name'
                    ? 'displayName'
                    : 'displayShortName',
        },
        rootOrgUnits: rootOrgUnits.organisationUnits?.map((ou) => ou.id) || [],
        dataElements: dataElements.dataElements.map((de) => {
            return {
                ...de,
                value: de.id,
                label: de.name,
            }
        }),
        dataElementGroups: dataElementGroups.dataElementGroups.map((deg) => {
            return {
                ...deg,
                value: deg.id,
                label: deg.name,
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
