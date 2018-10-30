/* global DHIS_CONFIG, manifest */
import { config } from 'd2/lib/d2'

let version = '30'
let url = 'http://localhost:8080'

if (typeof manifest !== 'undefined') {
    version = manifest.dhis2.apiVersion
}

const isProd = process.env.NODE_ENV === 'production'
if (isProd) {
    url = manifest.activities.dhis.href
} else if (!isProd && typeof DHIS_CONFIG === 'object') {
    url = DHIS_CONFIG.baseUrl
}

config.baseUrl = `${url}/api/${version}`

export const apiConfig = {
    version,
    server: url,
}
