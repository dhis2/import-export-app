export const getOrgUnit = state => state.orgUnit
export const getOrgUnits = state => getOrgUnit(state).data
export const getOrgUnitRootLoading = state => getOrgUnit(state).loadingRoot
export const getOrgUnitRootLoaded = state => getOrgUnit(state).loadedRoot
export const getOrgUnitRootError = state => getOrgUnit(state).errorRoot
export const getOrgUnitChildrenLoading = state =>
    getOrgUnit(state).loadingChildren
export const getOrgUnitChildrenError = state => getOrgUnit(state).errorChildren
