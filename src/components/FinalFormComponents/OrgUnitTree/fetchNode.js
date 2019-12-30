import { api } from '../../../services'
import { isProduction } from '../../../helpers/env'

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

export const fetchNode = async (path, curList, setList) => {
    try {
        const params = []
        const id = path.substr(path.lastIndexOf('/') + 1)
        params.push('filter=' + encodeURIComponent(`id:in:[${id}]`))
        params.push(
            'fields=' +
                encodeURIComponent(
                    ':all,displayName,path,children[id,displayName,path,children::isNotEmpty]'
                )
        )
        params.push('paging=false')
        params.push('format=json')

        const {
            data: { organisationUnits },
        } = await api.get(`organisationUnits?${params.join('&')}`)
        const { children } = organisationUnits[0]

        const items = children.map(({ path, displayName, children }) => ({
            open: false,
            value: path,
            label: displayName,
            children: children ? [] : null,
        }))
        items.sort((a, b) => a.label.localeCompare(b.label))

        const listWithChildren = setChildren(path, items, curList)
        setList(listWithChildren)
    } catch (e) {
        !isProduction && console.log('OrgUnitTree fetchNode failed')
        !isProduction && console.log(e)
    }
}
