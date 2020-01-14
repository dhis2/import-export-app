import {
    CLOSE_ORG_UNIT,
    LOADING_ORG_UNITS_CHILDREN_ERROR,
    LOADING_ORG_UNITS_CHILDREN_START,
    LOADING_ORG_UNITS_ROOT_ERROR,
    LOADING_ORG_UNITS_ROOT_START,
    OPEN_ORG_UNIT,
    SET_ORG_UNIT_CHILDREN,
    SET_ROOT_ORG_UNIT,
} from './actions'

export * from './actions'
export * from './selectors'
export * from './thunks'

const findIndexForPath = (list, path) =>
    list.reduce((index, item, curIndex) => {
        if (index !== -1) return index
        if (item.value === path) return curIndex
        return index
    }, -1)

const setChildren = (path, children, list) => {
    if (!Array.isArray(list)) {
        return list
    }

    const index = findIndexForPath(list, path)

    if (index !== -1) {
        return [
            ...list.slice(0, index),
            { ...list[index], children },
            ...list.slice(index + 1),
        ]
    }

    return list.map(item => {
        return {
            ...item,
            children: setChildren(path, children, item.children),
        }
    })
}

const updateOpenStateForPath = (path, list, open) => {
    if (!Array.isArray(list)) {
        return list
    }

    const index = findIndexForPath(list, path)

    if (index !== -1) {
        return [
            ...list.slice(0, index),
            { ...list[index], open },
            ...list.slice(index + 1),
        ]
    }

    return list.map(item => {
        return {
            ...item,
            children: updateOpenStateForPath(path, item.children, open),
        }
    })
}

export const orgUnitsDefaultState = {
    loadingRoot: false,
    loadedRoot: false,
    errorRoot: '',

    loadingChildren: false,
    errorChildren: '',

    data: [],
}

export default function orgUnitsReducer(
    state = orgUnitsDefaultState,
    { type, payload }
) {
    if (type === LOADING_ORG_UNITS_ROOT_START) {
        return {
            ...state,
            loadingRoot: true,
            errorRoot: '',
        }
    }

    if (type === LOADING_ORG_UNITS_ROOT_ERROR) {
        return {
            ...state,
            loadingRoot: false,
            errorRoot: payload.error,
        }
    }

    if (type === LOADING_ORG_UNITS_CHILDREN_START) {
        return {
            ...state,
            loadingChildren: true,
            errorChildren: '',
            data: updateOpenStateForPath(payload.path, state.data, true),
        }
    }

    if (type === LOADING_ORG_UNITS_CHILDREN_ERROR) {
        return {
            ...state,
            loadingChildren: false,
            errorChildren: payload.error,
        }
    }

    if (type === SET_ROOT_ORG_UNIT) {
        return {
            ...state,
            loadingRoot: false,
            loadedRoot: true,
            data: payload.orgUnit,
        }
    }

    if (type === SET_ORG_UNIT_CHILDREN) {
        return {
            ...state,
            loadingRoot: false,
            loadedRoot: true,
            data: setChildren(payload.path, payload.children, state.data),
        }
    }

    if (type === CLOSE_ORG_UNIT) {
        return {
            ...state,
            data: updateOpenStateForPath(payload.path, state.data, false),
        }
    }

    if (type === OPEN_ORG_UNIT) {
        return {
            ...state,
            data: updateOpenStateForPath(payload.path, state.data, true),
        }
    }

    return state
}
