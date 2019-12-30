import { getPrograms } from '../../helpers/api'
import {
    loadingProgramsError,
    loadingProgramsStart,
    setPrograms,
} from './actions'

export const fetchPrograms = () => dispatch => {
    dispatch(loadingProgramsStart())

    return getPrograms()
        .then(programs => {
            const formattedPrograms = programs.map(program => ({
                value: program.id,
                label: program.displayName,
            }))

            return dispatch(setPrograms(formattedPrograms))
        })
        .catch(({ message }) => dispatch(loadingProgramsError(message)))
}
