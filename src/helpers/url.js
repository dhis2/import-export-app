import { getIsProduction } from './env'

export const download = url => {
    // For Cypress tests
    // With dead code elimination
    if (!getIsProduction() && window.Cypress) {
        // Tests will fail if this is not stubbed
        // Which is good
        return window.stubs.assign(url)
    }

    return window.location.assign(url)
}
