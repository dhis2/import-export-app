import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useState, useEffect } from 'react'
import { getPeriods } from '../util/earthEngineHelper'

const usePeriods = (eeId, setSelected) => {
    const engine = useDataEngine()
    const [error /*, setError*/] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [periods, setPeriods] = useState([])

    useEffect(() => {
        const asyncGetPeriods = async () => {
            if (eeId) {
                const p = await getPeriods(eeId, engine)
                setPeriods(p)
                setLoading(false)
                if (p.length === 1) {
                    setSelected(p[0].value)
                }
            }
        }

        if (eeId) {
            setLoading(true)
            asyncGetPeriods()
            setSelected(undefined)
        } else {
            setLoading(false)
        }
    }, [eeId])

    const validationText =
        error &&
        `${i18n.t(
            'Something went wrong when loading the Earth Engine periods'
        )} : ${error.message}`

    return { loading, error, validationText, periods }
}

export { usePeriods }
