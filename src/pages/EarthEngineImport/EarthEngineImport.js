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
    dataSets: {
        resource: 'dataSets',
        params: {
            fields:
                'id,displayName~rename(name),dataSetElements[dataElement[id,displayName~rename(name)]]',
            paging: 'false',
        },
    },
}

const providerDataTransformation = ({
    userSettings,
    rootOrgUnits,
    dataSets,
}) => {
    return {
        userSettings: {
            ...userSettings,
            [DERIVED_USER_SETTINGS_DISPLAY_NAME_PROPERTY]:
                userSettings[USER_SETTINGS_DISPLAY_PROPERTY] === 'name'
                    ? 'displayName'
                    : 'displayShortName',
        },
        rootOrgUnits: rootOrgUnits.organisationUnits?.map(ou => ou.id) || [],
        dataSets: dataSets.dataSets.reduce((acc, curr) => {
            const dataElements = curr.dataSetElements.map(
                ({ dataElement }) => ({
                    id: dataElement.id,
                    name: dataElement.name,
                    value: dataElement.id,
                    label: dataElement.name,
                })
            )
            const key = curr.id
            acc[key] = {
                id: curr.id,
                name: curr.name,
                label: curr.name,
                value: curr.id,
                dataElements,
            }
            return acc
        }, {}),
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
