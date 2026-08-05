import { allCategories, toNotifierCategory } from '../tasks.jsx'

describe('toNotifierCategory', () => {
    it('maps the GML_IMPORT UI category to the METADATA_IMPORT notifier category', () => {
        // POST /api/metadata/gml runs as a METADATA_IMPORT job on the backend, so its
        // progress events and summary are published under METADATA_IMPORT. [DHIS2-21758]
        expect(toNotifierCategory('GML_IMPORT')).toBe('METADATA_IMPORT')
    })

    it('leaves every other import category unchanged', () => {
        allCategories
            .filter((category) => category !== 'GML_IMPORT')
            .forEach((category) => {
                expect(toNotifierCategory(category)).toBe(category)
            })
    })
})
