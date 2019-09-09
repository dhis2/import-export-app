import { getSharedAttributes, getSharedAttributesLoading } from '../selectors'

describe('Selector - Attributes - getSharedAttributes', () => {
    const hrIdentifier = {
        id: 'UKNKz1H10EE',
        displayName: 'HR identifier',
    }

    const keCode = {
        id: 'l1VmqIHKk6t',
        displayName: 'KE code',
    }

    it('should return the hrIdentifier attribute when it is shared', () => {
        const state = {
            attributes: {
                dataElement: { data: [hrIdentifier] },
                organisationUnit: { data: [hrIdentifier, keCode] },
            },
        }

        expect(getSharedAttributes(state)).toEqual([
            {
                id: 'UKNKz1H10EE',
                displayName: 'HR identifier',
            },
        ])
    })

    it('should return an empty array when no attributes are shared', () => {
        const state = {
            attributes: {
                dataElement: { data: [] },
                organisationUnit: { data: [hrIdentifier, keCode] },
            },
        }

        expect(getSharedAttributes(state)).toEqual([])
    })
})

describe('Selector - Attributes - getSharedAttributesLoading', () => {
    it('should return true when all loading states are true', () => {
        const state = {
            attributes: {
                dataElement: { loading: true },
                organisationUnit: { loading: true },
            },
        }

        expect(getSharedAttributesLoading(state)).toBe(true)
    })

    it('should return true when one loading state is true', () => {
        const state = {
            attributes: {
                dataElement: { loading: true },
                organisationUnit: { loading: false },
            },
        }

        expect(getSharedAttributesLoading(state)).toBe(true)
    })

    it('should return false when no loading state is true', () => {
        const state = {
            attributes: {
                dataElement: { loading: false },
                organisationUnit: { loading: false },
            },
        }

        expect(getSharedAttributesLoading(state)).toBe(false)
    })
})
