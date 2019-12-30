import { getDataSets } from '../../helpers/api'
import {
    loadingDataSetsDone,
    loadingDataSetsError,
    loadingDataSetsStart,
} from './actions'

export const loadDataSets = () => dispatch => {
    dispatch(loadingDataSetsStart())

    return getDataSets()
        .then(sets =>
            sets.map(dataSet => ({
                value: dataSet.id,
                label: dataSet.displayName,
            }))
        )
        .then(dataSets => dispatch(loadingDataSetsDone(dataSets)))
        .catch(({ message }) => dispatch(loadingDataSetsError(message)))
}
