import { locationAssign } from './helper.js'

describe('locationAssign', () => {
    beforeEach(() => {
        jest.useFakeTimers('modern')
        jest.setSystemTime(new Date(2024, 2, 12))
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should create a file name based on the params', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/trackedEntities.json?ouMode=CAPTURE&format=json&includeDeleted=false&dataElementIdScheme=UID&eventIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&attachment=trackedEntities.json&paging=false&totalPages=false&program=lxAQ7Zs9VYR'
        const link = locationAssign(url)
        expect(link.download).toEqual(
            'trackedEntities_2024-03-12_ouMode_CAPTURE__program_lxAQ7Zs9VYR.json'
        )
    })
    it('should create url with orgUnits', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/trackedEntities.json?ouMode=SELECTED&includeDeleted=false&dataElementIdScheme=UID&eventIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&attachment=trackedEntities.json&paging=false&totalPages=false&orgUnits=O6uvpzGd5pu,fdc6uOvgoji&program=kla3mAPgvCH'
        const link = locationAssign(url)
        expect(link.download).toEqual(
            'trackedEntities_2024-03-12_ouMode_SELECTED__orgUnits_O6uvpzGd5pu,fdc6uOvgoji__program_kla3mAPgvCH.json'
        )
    })
    it('should create url with tracked entities', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/trackedEntities.json?ouMode=SELECTED&includeDeleted=false&dataElementIdScheme=UID&eventIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&attachment=trackedEntities.json&paging=false&totalPages=false&orgUnits=ImspTQPwCqd&trackedEntityType=bVkFYAvoUCP'
        const link = locationAssign(url)
        expect(link.download).toEqual(
            'trackedEntities_2024-03-12_ouMode_SELECTED__orgUnits_ImspTQPwCqd__trackedEntityType_bVkFYAvoUCP.json'
        )
    })
    it('should create url with CSV', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/trackedEntities.csv?ouMode=SELECTED&includeDeleted=false&dataElementIdScheme=UID&eventIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&attachment=trackedEntities.csv&paging=false&totalPages=false&orgUnits=ImspTQPwCqd&program=lxAQ7Zs9VYR'
        const link = locationAssign(url)
        expect(link.download).toEqual(
            'trackedEntities_2024-03-12_ouMode_SELECTED__orgUnits_ImspTQPwCqd__program_lxAQ7Zs9VYR.csv'
        )
    })

    it('should create url with events zip', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/events.json.zip?links=false&paging=false&totalPages=false&orgUnit=fwH9ipvXde9&program=VBqh0ynB2wv&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&attachment=events.json.zip&occurredAfter=2023-12-12&occurredBefore=2024-03-12&ouMode=CHILDREN&format=json'
        const link = locationAssign(url)
        expect(link.download).toEqual(
            'events_2024-03-12_orgUnit_fwH9ipvXde9__program_VBqh0ynB2wv__ouMode_CHILDREN.json.zip'
        )
    })

    it('should create url with events gzip', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/events.json.gz?links=false&paging=false&totalPages=false&orgUnit=ImspTQPwCqd&program=lxAQ7Zs9VYR&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&attachment=events.json.gz&occurredAfter=2023-12-12&occurredBefore=2024-03-12&ouMode=SELECTED&format=json'
        const link = locationAssign(url)
        expect(link.download).toEqual(
            'events_2024-03-12_orgUnit_ImspTQPwCqd__program_lxAQ7Zs9VYR__ouMode_SELECTED.json.gz'
        )
    })
    it('should work with relative URLs when bundled in DHIS2', () => {
        Object.defineProperty(global.document, 'baseURI', {
            value: 'http://localhost:8080/dhis-web-import-export/index.html#/export/tei',
        })
        const url =
            '../api/tracker/trackedEntities.json?ouMode=SELECTED&includeDeleted=false&dataElementIdScheme=UID&eventIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&attachment=trackedEntities.json&paging=false&totalPages=false&orgUnits=ImspTQPwCqd&program=lxAQ7Zs9VYR'
        const link = locationAssign(url)
        expect(link.download).toEqual(
            'trackedEntities_2024-03-12_ouMode_SELECTED__orgUnits_ImspTQPwCqd__program_lxAQ7Zs9VYR.json'
        )
    })
    it('should work with relative URLs when bundled in DHIS2 for zip', () => {
        Object.defineProperty(global.document, 'baseURI', {
            value: 'http://localhost:8080/dhis-web-import-export/index.html#/export/tei',
        })
        const url =
            '../api/tracker/events.json.zip?links=false&paging=false&totalPages=false&orgUnit=ImspTQPwCqd&program=lxAQ7Zs9VYR&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&attachment=events.json.zip&occurredAfter=2023-12-12&occurredBefore=2024-03-12&ouMode=SELECTED&format=json'
        const link = locationAssign(url)
        expect(link.download).toEqual(
            'trackedEntities_2024-03-12_ouMode_SELECTED__orgUnits_ImspTQPwCqd__program_lxAQ7Zs9VYR.json'
        )
    })
})
