import { categoryTypes } from '../../utils/tasks.js'

const categoryTypesObj = categoryTypes.reduce((acc, cur) => {
    acc[cur.importType] = cur
    return acc
}, {})

const jobToPath = (job) => ({
    pathname: `/import/${categoryTypesObj[job.importType]?.key}`,
    query: { id: job.id },
})

export { categoryTypesObj, jobToPath }
