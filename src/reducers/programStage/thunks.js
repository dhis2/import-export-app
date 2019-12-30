import { getProgramStages } from '../../helpers/api'
import {
    loadingProgramStagesError,
    loadingProgramStagesStart,
    setProgramStages,
} from './actions'

export const fetchProgramStages = programId => dispatch => {
    dispatch(loadingProgramStagesStart())

    return getProgramStages(programId)
        .then(programStages => {
            const formattedProgramStages = programStages.map(programStage => ({
                value: programStage.id,
                label: programStage.displayName,
            }))

            return dispatch(setProgramStages(formattedProgramStages))
        })
        .catch(({ message }) => dispatch(loadingProgramStagesError(message)))
}
