import { allCategories, toNotifierCategory } from '../tasks.jsx'

// Mirrors the shape of useConfig()'s serverVersion, e.g. { minor: '44' }
const currentApiVersion = '44'
const preGmlMetadataApiVersion = '40'

describe('toNotifierCategory', () => {
    it('maps the GML_IMPORT UI category to the METADATA_IMPORT notifier category from API version 41 onwards', () => {
        // POST /api/metadata/gml runs as a METADATA_IMPORT job on the backend from API
        // version 41 onwards, so its progress events and summary are published under
        // METADATA_IMPORT. [DHIS2-21758]
        expect(toNotifierCategory('GML_IMPORT', currentApiVersion)).toBe(
            'METADATA_IMPORT'
        )
    })

    it('leaves every other import category unchanged', () => {
        allCategories
            .filter((category) => category !== 'GML_IMPORT')
            .forEach((category) => {
                expect(toNotifierCategory(category, currentApiVersion)).toBe(
                    category
                )
            })
    })

    it('leaves the GML_IMPORT UI category unchanged for API versions before 41', () => {
        expect(toNotifierCategory('GML_IMPORT', preGmlMetadataApiVersion)).toBe(
            'GML_IMPORT'
        )
    })
})
