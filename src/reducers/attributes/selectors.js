import { createSelector } from 'reselect'

const attributeFoundIn = (attribute, collection) =>
    !!collection.find(({ id }) => id === attribute.id)

export const getDataElementAttributes = state =>
    state.attributes.dataElement.data

export const getDataElementAttributesLoading = state =>
    state.attributes.dataElement.loading

export const getDataElementAttributesLoaded = state =>
    state.attributes.dataElement.loaded

export const getDataElementAttributesError = state =>
    state.attributes.dataElement.error

export const getOrgUnitAttributes = state =>
    state.attributes.organisationUnit.data

export const getOrgUnitAttributesLoading = state =>
    state.attributes.organisationUnit.loading

export const getOrgUnitAttributesLoaded = state =>
    state.attributes.organisationUnit.loaded

export const getOrgUnitAttributesError = state =>
    state.attributes.organisationUnit.error

export const getCategoryAttributes = state => state.attributes.category.data

export const getCateboryAttributesLoading = state =>
    state.attributes.category.loading

export const getCateboryAttributesLoaded = state =>
    state.attributes.category.loaded

export const getCateboryAttributesError = state =>
    state.attributes.category.error

export const getSharedAttributes = createSelector(
    [getDataElementAttributes, getOrgUnitAttributes],
    (dataElementAttributes, orgUnitAttributes) =>
        dataElementAttributes.reduce((shared, attribute) => {
            const foundInOrgUnits = attributeFoundIn(
                attribute,
                orgUnitAttributes
            )

            return foundInOrgUnits ? [...shared, attribute] : shared
        }, [])
)

export const getSharedAttributesLoading = createSelector(
    [getDataElementAttributesLoading, getOrgUnitAttributesLoading],
    (dataElementAttributesLoading, orgUnitAttributesLoading) =>
        dataElementAttributesLoading || orgUnitAttributesLoading
)
