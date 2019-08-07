import { useState, useMemo } from 'react'

export const useErrorHandler = () => {
    const [error, setError] = useState('')
    const errorHandler = useMemo(
        () => event => {
            try {
                setError(event.target.response.message)
            } catch (e) {
                // copied mechanism from
                // src/components/Formbase/index.js::assertOnError
            }
        },
        [setError]
    )

    return [error, errorHandler]
}
