import { createSelector } from 'reselect'

const attributeFoundIn = (attribute, collection) =>
    !!collection.find(({ id }) => id === attribute.id)

export const getDataElementAttributes = state =>
    state.attributes.dataElement.data

export const getDataElementAttributesLoading = state =>
    state.attributes.dataElement.loading

export const getOrgUnitAttributes = state =>
    state.attributes.organisationUnit.data

export const getOrgUnitAttributesLoading = state =>
    state.attributes.organisationUnit.loading

export const getCategoryAttributes = state => state.attributes.category.data

export const getCateboryAttributesLoading = state =>
    state.attributes.category.loading

export const getSharedAttributes = createSelector(
    [getDataElementAttributes, getOrgUnitAttributes, getCategoryAttributes],
    (dataElementAttributes, orgUnitAttributes, categoryAttributes) =>
        dataElementAttributes.reduce((shared, attribute) => {
            const foundInOrgUnits = attributeFoundIn(
                attribute,
                orgUnitAttributes
            )

            const foundInCategories = attributeFoundIn(
                attribute,
                categoryAttributes
            )

            return foundInOrgUnits && foundInCategories
                ? [...shared, attribute]
                : shared
        }, [])
)

export const getSharedAttributesLoading = createSelector(
    [
        getDataElementAttributesLoading,
        getOrgUnitAttributesLoading,
        getCateboryAttributesLoading,
    ],
    (
        dataElementAttributesLoading,
        orgUnitAttributesLoading,
        categoryAttributesLoading
    ) =>
        dataElementAttributesLoading ||
        orgUnitAttributesLoading ||
        categoryAttributesLoading
)
