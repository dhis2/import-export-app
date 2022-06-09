const sortByLevel = orgUnits => {
    orgUnits.sort((a, b) => a.le - b.le)
    return orgUnits
}

const TYPE_POINT = 'Point'
const TYPE_POLYGON = 'Polygon'
const TYPE_MULTIPOLYGON = 'MultiPolygon'
const TYPE_FEATURE = 'Feature'

//Returns an array with all falsey values removed.
//copied from lodash
const compact = arr => {
    let resIndex = 0
    const result = []

    if (arr == null) {
        return result
    }

    for (const value of arr) {
        if (value) {
            result[resIndex++] = value
        }
    }
    return result
}

export const toGeoJson = organisationUnits =>
    sortByLevel(organisationUnits)
        .map(ou => {
            const coord = JSON.parse(ou.co)
            let gpid = ''
            let gppg = ''
            let type = TYPE_POINT

            if (ou.ty === 2) {
                type = TYPE_POLYGON
                if (ou.co.substring(0, 4) === '[[[[') {
                    type = TYPE_MULTIPOLYGON
                }
            }

            // Grand parent
            if (typeof ou.pg === 'string' && ou.pg.length) {
                const ids = compact(ou.pg.split('/'))

                // Grand parent id
                if (ids.length >= 2) {
                    gpid = ids[ids.length - 2]
                }

                // Grand parent parent graph
                if (ids.length > 2) {
                    gppg = '/' + ids.slice(0, ids.length - 2).join('/')
                }
            }

            return {
                type: TYPE_FEATURE,
                id: ou.id,
                geometry: {
                    type,
                    coordinates: coord,
                },
                properties: {
                    type,
                    id: ou.id,
                    name: ou.na,
                    hasCoordinatesDown: ou.hcd,
                    hasCoordinatesUp: ou.hcu,
                    level: ou.le,
                    grandParentParentGraph: gppg,
                    grandParentId: gpid,
                    parentGraph: ou.pg,
                    parentId: ou.pi,
                    parentName: ou.pn,
                    dimensions: ou.dimensions,
                },
            }
        })
        .filter(
            ({ geometry }) =>
                Array.isArray(geometry.coordinates) &&
                geometry.coordinates.length
        )
