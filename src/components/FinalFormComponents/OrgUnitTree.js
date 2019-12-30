import { useField } from 'react-final-form'
import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'

import { Tree } from '../Tree'
import { fetchNode } from './OrgUnitTree/fetchNode'
import { fetchRoot } from './OrgUnitTree/fetchRoot'

export const OrgUnitTree = ({ name, selected }) => {
    const initialValue = selected
    const { input } = useField(name, {
        initialValue,
        type: 'select',
    })
    const [list, setList] = useState([])

    const onIconClick = (path, open, list) => {
        setList(list)
        if (open) fetchNode(path, list, setList)
    }

    useEffect(() => {
        fetchRoot(setList)
    }, [])

    return (
        <Tree
            multiple={true}
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
}

OrgUnitTree.defaultProps = {
    selected: [],
}
