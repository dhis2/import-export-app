import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useState } from 'react'
import { getPeriods, getAggregations } from '../util/earthEngineHelper.js'
import { getDefaultAggregation } from '../util/earthEngines.js'
import { getEarthEngineConfig } from '../util/getEarthEngineConfig.js'
import { getStructuredData } from '../util/getStructuredData.js'

const useEeData = () => {
    const engine = useDataEngine()
    const [eeData, setEeData] = useState([])
    const [pointOuRows, setPointOuRows] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const fetchEeData = async ({
        earthEngineId,
        organisationUnits,
        associatedGeometry,
        period,
        rounding,
        bandCocs = [],
    }) => {
        const selectedBandCocs = bandCocs.filter((bc) => !!bc.coc)

        const aggregationType = getDefaultAggregation(earthEngineId)

        setLoading(true)
        setErrorMessage(null)

        try {
            const periods = await getPeriods(earthEngineId, engine)

            const { config, pointOrgUnits } = await getEarthEngineConfig(
                {
                    earthEngineId,
                    organisationUnits,
                    associatedGeometry,
                    period,
                    periods,
                    aggregationType,
                    selectedBandCocs,
                },
                engine
            )

            const data = await getAggregations(engine, config)

            const ouIdNameMap = config.data?.reduce((acc, curr) => {
                acc[curr.id] = curr.properties
                return acc
            }, {})

            const structuredData = getStructuredData({
                data,
                selectedBandCocs,
                ouIdNameMap,
                rounding,
                aggregationType,
            })

            setEeData(structuredData)
            setPointOuRows(pointOrgUnits)
            setLoading(false)
        } catch (error) {
            console.log('Error while loading Earth Engine data', error)
            setEeData([])
            setPointOuRows(null)
            setLoading(false)
            const message = error.message || error

            let msg = i18n.t(
                'An error occurred while trying to fetch Earth Engine data'
            )

            if (message.includes('Output of image computation is too large')) {
                msg = i18n.t(
                    'The Earth Engine data set is too large. Try reducing the number of groups or organisation units'
                )
            } else if (
                message.includes(
                    'Dimension is present in query without any valid dimension options: `ou`'
                )
            ) {
                msg = i18n.t('The organisation units selection is invalid')
            } else if (message.length) {
                msg = msg.concat(`: ${message}`)
            }
            setErrorMessage(msg)

            return
        }
    }

    return {
        eeData,
        pointOuRows,
        loading,
        errorMessage,
        fetchEeData,
    }
}

export { useEeData }
