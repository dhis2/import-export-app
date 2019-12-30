import { useDispatch, useSelector } from 'react-redux'
import { useField } from 'react-final-form'
import React, { useEffect } from 'react'
import propTypes from 'prop-types'

import { Tree } from '../Tree'
import { closeOrgUnit } from '../../reducers/orgUnits/actions'
import {
    getOrgUnitRootLoaded,
    getOrgUnitRootLoading,
    getOrgUnits,
} from '../../reducers/orgUnits/selectors'
import { openPath, loadRootOrgUnit } from '../../reducers/orgUnits/thunks'

export const OrgUnitTree = ({ name, selected, multiple }) => {
    const dispatch = useDispatch()
    const list = useSelector(getOrgUnits)
    const rootLoaded = useSelector(getOrgUnitRootLoaded)
    const rootLoading = useSelector(getOrgUnitRootLoading)
    const onIconClick = (path, open) => {
        if (open) {
            dispatch(openPath(path))
        } else {
            dispatch(closeOrgUnit(path))
        }
    }

    useEffect(() => {
        if (!rootLoaded && !rootLoading) {
            dispatch(loadRootOrgUnit())
        }
    }, [rootLoaded, rootLoading, dispatch])

    const { input } = useField(name, {
        initialValue: selected,
        type: 'select',
    })

    return (
        <Tree
            multiple={multiple}
            selectable={true}
            list={list}
            selected={input.value}
            onIconClick={onIconClick}
            setSelected={input.onChange}
        />
    )
}

OrgUnitTree.propTypes = {
    name: propTypes.string.isRequired,
    selected: propTypes.arrayOf(propTypes.string).isRequired,
    multiple: propTypes.bool,
}

OrgUnitTree.defaultProps = {
    selected: [],
    multiple: true,
}
