import { useState, useMemo } from 'react'

export const useErrorHandler = () => {
    const [error, setError] = useState('')
    const errorHandler = useMemo(
        () => event => {
            console.log('event', event)
            try {
                setError(event.target.response.message)
            } catch (e) {}
        },
        [setError]
    )

    return [error, errorHandler]
}
