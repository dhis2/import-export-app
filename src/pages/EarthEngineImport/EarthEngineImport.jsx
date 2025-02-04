import i18n from '@dhis2/d2-i18n'
import React from 'react'
import { NO_ASSOCIATED_GEOMETRY } from './components/AssociatedGeometry.jsx'
import { EarthEngineImportForm } from './EarthEngineImportForm.jsx'
import { CachedDataQueryProvider } from './util/CachedQueryProvider.jsx'

// PAGE INFO
export const PAGE_NAME = i18n.t('Earth Engine import')
export const PAGE_DESCRIPTION = i18n.t(
    'Import high resolution population data from WorldPop using Google Earth Engine.'
)

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
            fields: 'id,displayName~rename(name),categoryCombo[categoryOptionCombos[id,code,displayName~rename(name)]]',
            filter: 'domainType:eq:AGGREGATE',
            paging: false,
        },
    },
    associatedGeometry: {
        resource: 'attributes',
        params: {
            fields: 'id,displayName~rename(name)',
            filter: [
                'valueType:eq:GEOJSON',
                'organisationUnitAttribute:eq:true',
            ],
            paging: false,
        },
    },
}

const providerDataTransformation = ({
    rootOrgUnits,
    dataElements,
    associatedGeometry,
}) => {
    return {
        rootOrgUnits: rootOrgUnits.organisationUnits?.map((ou) => ou.id) || [],
        dataElements: dataElements.dataElements.map((de) => ({
            ...de,
            value: de.id,
            label: de.name,
        })),
        associatedGeometry: [
            { label: 'None', value: NO_ASSOCIATED_GEOMETRY },
        ].concat(
            associatedGeometry.attributes.map((ag) => {
                return {
                    ...ag,
                    value: ag.id,
                    label: ag.name,
                }
            })
        ),
    }
}

const EarthEngineImport = () => (
    <CachedDataQueryProvider
        query={query}
        dataTransformation={providerDataTransformation}
    >
        <EarthEngineImportForm />
    </CachedDataQueryProvider>
)

export { EarthEngineImport }
