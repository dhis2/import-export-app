import { isProduction } from './env'

const assign = url => (window.location.url = url)

/**
 * Cypress does not have any mechanism to intercept assignments
 * to window.location, so a stub-able function is required.
 * When cypress runs, the env will be "development", not "testing",
 * so we can't just call window.assign in the function, as that
 * would break the normal development version
 */
if (!isProduction) {
    window.assign = assign
}

/**
 * In order to not expose this function on the window object
 * in production, the function on the window object is called
 * only when not in production mode
 */
export const download = url => {
    if (isProduction) {
        return assign(url)
    }

    return window.assign(url)
}
