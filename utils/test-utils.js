import * as testingLibrary from '@testing-library/react'
import * as customQueries from './custom-queries.js'

const { queries } = testingLibrary

console.log('testingLibrary', testingLibrary)

const customRender = (ui, options) =>
    testingLibrary.render(ui, {
        queries: { ...queries, ...customQueries },
        ...options,
    })

/* eslint-disable */
// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
/* eslint-enable */
