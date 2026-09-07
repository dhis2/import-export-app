import { FORM_ERROR } from './final-form.js'
import { fetchAndDownload, formatNumber, locationAssign } from './helper.js'

describe('formatNumber', () => {
    it('adds digit group separators to numbers', () => {
        expect(formatNumber(1234567, 'en')).toEqual('1,234,567')
    })
    it('handles numeric strings', () => {
        expect(formatNumber('1234567.5', 'en')).toEqual('1,234,567.5')
    })
    it('handles zero', () => {
        expect(formatNumber(0, 'en')).toEqual('0')
    })
    it('returns non-numeric strings unchanged', () => {
        expect(formatNumber('Point org. unit - no value', 'en')).toEqual(
            'Point org. unit - no value'
        )
    })
    it('returns undefined and null unchanged', () => {
        expect(formatNumber(undefined, 'en')).toBeUndefined()
        expect(formatNumber(null, 'en')).toBeNull()
    })
})

describe('locationAssign', () => {
    it('should create a file name based on the params', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/trackedEntities.json?orgUnitMode=CAPTURE&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&paging=false&totalPages=false&program=lxAQ7Zs9VYR'
        const link = locationAssign(url)
        expect(link.download).toEqual('trackedEntities.json')
    })
    it('should create url with orgUnits', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/trackedEntities.json?orgUnitMode=SELECTED&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&paging=false&totalPages=false&orgUnits=O6uvpzGd5pu,fdc6uOvgoji&program=kla3mAPgvCH'
        const link = locationAssign(url)
        expect(link.download).toEqual('trackedEntities.json')
    })
    it('should create url with tracked entities', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/trackedEntities.json?orgUnitMode=SELECTED&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&paging=false&totalPages=false&orgUnits=ImspTQPwCqd&trackedEntityType=bVkFYAvoUCP'
        const link = locationAssign(url)
        expect(link.download).toEqual('trackedEntities.json')
    })
    it('should create url with CSV', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/trackedEntities.csv?orgUnitMode=SELECTED&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&paging=false&totalPages=false&orgUnits=ImspTQPwCqd&program=lxAQ7Zs9VYR'
        const link = locationAssign(url)
        expect(link.download).toEqual('trackedEntities.csv')
    })

    it('should create url with events zip', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/events.json.zip?paging=false&totalPages=false&orgUnit=fwH9ipvXde9&program=VBqh0ynB2wv&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&occurredAfter=2023-12-12&occurredBefore=2024-03-12&orgUnitMode=CHILDREN'
        const link = locationAssign(url)
        expect(link.download).toEqual('events.json.zip')
    })

    it('should create url with events gzip', () => {
        const url =
            'https://debug.dhis2.org/dev/api/tracker/events.json.gz?paging=false&totalPages=false&orgUnit=ImspTQPwCqd&program=lxAQ7Zs9VYR&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&occurredAfter=2023-12-12&occurredBefore=2024-03-12&orgUnitMode=SELECTED'
        const link = locationAssign(url)
        expect(link.download).toEqual('events.json.gz')
    })
    it('should work with relative URLs when bundled in DHIS2', () => {
        Object.defineProperty(global.document, 'baseURI', {
            value: 'http://localhost:8080/dhis-web-import-export/index.html#/export/tei',
        })
        const url =
            '../api/tracker/trackedEntities.json?orgUnitMode=SELECTED&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&paging=false&totalPages=false&orgUnits=ImspTQPwCqd&program=lxAQ7Zs9VYR'
        const link = locationAssign(url)
        expect(link.download).toEqual('trackedEntities.json')
    })
    it('should work with relative URLs when bundled in DHIS2 for zip', () => {
        Object.defineProperty(global.document, 'baseURI', {
            value: 'http://localhost:8080/dhis-web-import-export/index.html#/export/tei',
        })
        const url =
            '../api/tracker/events.json.zip?paging=false&totalPages=false&orgUnit=ImspTQPwCqd&program=lxAQ7Zs9VYR&includeDeleted=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&idScheme=UID&occurredAfter=2023-12-12&occurredBefore=2024-03-12&orgUnitMode=SELECTED'
        const link = locationAssign(url)
        expect(link.download).toEqual('events.json.zip')
    })
})

describe('fetchAndDownload', () => {
    const url = 'https://debug.dhis2.org/dev/api/metadata.json'

    afterEach(() => {
        global.fetch.mockRestore?.()
        delete global.fetch
    })

    it('downloads the file and returns no error when the response is ok', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            blob: () => Promise.resolve(new Blob(['{}'])),
        })

        const result = await fetchAndDownload(url, 'metadata')

        expect(global.fetch).toHaveBeenCalledWith(url, {
            credentials: 'include',
        })
        expect(result).toBeUndefined()
    })

    it('returns a form error with the server message when the response is not ok', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ message: 'Conflict occurred' }),
        })

        const result = await fetchAndDownload(url, 'metadata')

        expect(result[FORM_ERROR]).toHaveLength(1)
        expect(result[FORM_ERROR][0]).toMatchObject({
            warning: true,
            message: 'Conflict occurred',
        })
    })

    it('falls back to a generic message when the error response has no JSON body', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: () => Promise.reject(new Error('not json')),
        })

        const result = await fetchAndDownload(url, 'metadata')

        expect(result[FORM_ERROR][0].message).toEqual(
            'An unknown error occurred. Please try again later'
        )
    })

    it('returns a form error when the request itself fails', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('network down'))

        const result = await fetchAndDownload(url, 'metadata')

        expect(result[FORM_ERROR][0].message).toEqual(
            'An unknown error occurred. Please try again later'
        )
    })
})
