import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { uploadFile } from '../../utils/helper.js'
import { onImport } from './form-helper.js'

jest.mock('../../utils/helper.js', () => ({
    uploadFile: jest.fn(() => Promise.resolve()),
}))

const jsonFile = (content) =>
    new File([JSON.stringify(content)], 'import.json', {
        type: 'application/json',
    })

const baseValues = {
    files: [],
    format: 'json',
    dryRun: false,
    identifier: 'UID',
    importReportMode: 'ERRORS',
    preheatMode: 'REFERENCE',
    strategy: 'NEW_AND_UPDATES',
    atomicMode: 'ALL',
    mergeMode: 'MERGE',
    flushMode: 'AUTO',
    skipSharing: false,
    skipValidation: false,
    inclusionStrategy: 'NON_NULL',
    isAsync: true,
    dataElementIdScheme: 'UID',
    orgUnitIdScheme: 'UID',
    idScheme: 'UID',
}

const submit = (values) =>
    onImport({
        baseUrl: 'https://server',
        setProgress: jest.fn(),
        addTask: jest.fn(),
        setShowFullSummaryTask: jest.fn(),
    })(values)

beforeEach(() => {
    uploadFile.mockClear()
})

it('rejects a legacy (pre-2.41) tracked entity instances payload without uploading it', async () => {
    const values = {
        ...baseValues,
        files: [jsonFile({ trackedEntityInstances: [] })],
    }

    const result = await submit(values)

    expect(uploadFile).not.toHaveBeenCalled()
    expect(result[FORM_ERROR]).toHaveLength(1)
    expect(result[FORM_ERROR][0].critical).toBe(true)
})

it('uploads a new-format tracker payload as usual', async () => {
    const values = {
        ...baseValues,
        files: [jsonFile({ trackedEntities: [] })],
    }

    const result = await submit(values)

    expect(uploadFile).toHaveBeenCalledTimes(1)
    expect(result).toEqual(jobStartedMessage)
})

it('rejects a payload that has both the legacy and new tracker keys', async () => {
    const values = {
        ...baseValues,
        files: [jsonFile({ trackedEntityInstances: [], trackedEntities: [] })],
    }

    const result = await submit(values)

    expect(uploadFile).not.toHaveBeenCalled()
    expect(result[FORM_ERROR]).toHaveLength(1)
})
