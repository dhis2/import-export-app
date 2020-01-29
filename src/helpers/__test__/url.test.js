import { download } from '../url'
import { getIsProduction } from '../env'

jest.mock('../env', () => ({
    getIsProduction: jest.fn(),
}))

jest.spyOn(window.location, 'assign').mockImplementation(url => url)

describe('download helper', () => {
    const url = 'https://domain.tld/file.ext'
    window.stubs = { assign: jest.fn() }

    afterEach(() => {
        window.location.assign.mockClear()
        window.stubs.assign.mockClear()
        getIsProduction.mockClear()
        delete window.Cypress
    })

    it('should call window.location.assign with the provided url', () => {
        getIsProduction.mockImplementationOnce(() => false)

        download(url)
        expect(window.location.assign).toHaveBeenCalledTimes(1)
        expect(window.location.assign).toHaveBeenCalledWith(url)
        expect(window.stubs.assign).toHaveBeenCalledTimes(0)
    })

    it('should not call window.stubs.assign when in production mode', () => {
        window.Cypress = true
        getIsProduction.mockImplementationOnce(() => true)

        download(url)
        expect(window.stubs.assign).toHaveBeenCalledTimes(0)
    })

    it('should use window.stubs.assign when cypress is testing the app in not-production mode', () => {
        window.Cypress = true
        getIsProduction.mockImplementationOnce(() => false)

        download(url)
        expect(window.location.assign).toHaveBeenCalledTimes(0)
        expect(window.stubs.assign).toHaveBeenCalledTimes(1)
        expect(window.stubs.assign).toHaveBeenCalledWith(url)
    })
})
