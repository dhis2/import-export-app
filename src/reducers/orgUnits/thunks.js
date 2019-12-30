import { getOrgUnitRoot, getOrgUnitsForPath } from '../../helpers/api'
import { getOrgUnits } from './selectors'
import {
    loadingOrgUnitsChildrenError,
    loadingOrgUnitsChildrenStart,
    loadingOrgUnitsRootError,
    loadingOrgUnitsRootStart,
    openOrgUnit,
    setOrgUnitChildren,
    setRootOrgUnits,
} from './actions'

export const loadRootOrgUnit = () => dispatch => {
    dispatch(loadingOrgUnitsRootStart())

    return getOrgUnitRoot()
        .then(root => {
            const list = root.toArray().map(item => {
                const { path, displayName } = item
                return {
                    open: false,
                    value: path,
                    label: displayName,
                    children: [],
                }
            })

            return dispatch(setRootOrgUnits(list))
        })
        .catch(({ message }) => dispatch(loadingOrgUnitsRootError(message)))
}

const findNode = (path, list) => {
    return list.reduce((found, node) => {
        if (found) return found
        if (node.value === path) return node

        const isParent = path.indexOf(node.value) === 0
        if (isParent) return findNode(path, node.children)

        return found
    }, null)
}
const hasPathChildren = (path, list) => {
    const node = findNode(path, list)
    if (!node) return false
    return !!node.children.length
}

export const openPath = path => (dispatch, getState) => {
    if (hasPathChildren(path, getOrgUnits(getState()))) {
        return Promise.resolve(dispatch(openOrgUnit(path)))
    }

    dispatch(loadingOrgUnitsChildrenStart(path))

    return getOrgUnitsForPath(path)
        .then(children => {
            const items = children.map(({ path, displayName, children }) => ({
                open: false,
                value: path,
                label: displayName,
                children: children ? [] : null,
            }))
            items.sort((a, b) => a.label.localeCompare(b.label))

            return dispatch(setOrgUnitChildren(path, items))
        })
        .catch(({ message }) => dispatch(loadingOrgUnitsChildrenError(message)))
}
