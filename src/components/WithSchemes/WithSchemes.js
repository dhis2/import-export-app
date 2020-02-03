import React, { useState } from 'react'

import { SchemeContext } from '../../contexts/'

const WithSchemes = Component => props => {
    const dataElementIdSchemeState = {
        options: [],
        loaded: false,
        error: false,
    }
    const orgUnitIdSchemeState = {
        options: [],
        loaded: false,
        error: false,
    }
    const idSchemeState = {
        options: [],
        loaded: false,
        error: false,
    }
    const [elementSchemes, setElementSchemes] = useState({
        DataElementId: dataElementIdSchemeState,
        OrgUnitId: orgUnitIdSchemeState,
        Id: idSchemeState,
        updateSchema: (type, value) =>
            setElementSchemes(schemas => ({ ...schemas, [type]: value })),
    })

    return (
        <SchemeContext.Provider value={elementSchemes}>
            <Component {...props} />
        </SchemeContext.Provider>
    )
}

export { WithSchemes }
