/* global DHIS_CONFIG, manifest */
import { config } from 'd2/lib/d2'

let version = 'dev'
let url = 'http://localhost:8080'

if (typeof manifest !== 'undefined') {
    version = manifest.dhis2.apiVersion
}

const IS_PROD = process.env.NODE_ENV === 'production'

if (IS_PROD) {
    url = manifest.activities.dhis.href
} else if (!IS_PROD && typeof DHIS_CONFIG === 'object') {
    url = DHIS_CONFIG.baseUrl
}

config.baseUrl = `${url}/api/${version}`

export const apiConfig = {
    version,
    server: url,
}
