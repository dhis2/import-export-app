import { FORM_ERROR, jobStartedMessage } from '../../utils/final-form.js'
import { uploadFile } from '../../utils/helper.js'
import { onImport } from './form-helper.js'

jest.mock('../../utils/helper.js', () => ({
    uploadFile: jest.fn(() => Promise.resolve()),
}))

const csvFile = (content) =>
    new File([content], 'events.csv', { type: 'text/csv' })

const legacyHeader =
    'event,status,program,programStage,enrollment,orgUnit,eventDate,dueDate,latitude,longitude,dataElement,value,storedBy,providedElsewhere,completedDate,completedBy,geometry,attributeOptionCombo'

const newHeader =
    'event,status,program,programStage,enrollment,orgUnit,occurredAt,scheduledAt,geometry,latitude,longitude,followUp,deleted,dataElement,value,storedBy,providedElsewhere,completedBy,completedAt,attributeOptionCombo'

const baseValues = {
    files: [],
    format: 'csv',
    dryRun: false,
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

it('rejects a legacy (pre-2.41) event CSV payload without uploading it', async () => {
    const values = {
        ...baseValues,
        files: [csvFile(`${legacyHeader}\n`)],
    }

    const result = await submit(values)

    expect(uploadFile).not.toHaveBeenCalled()
    expect(result[FORM_ERROR]).toHaveLength(1)
    expect(result[FORM_ERROR][0].critical).toBe(true)
})

it('rejects a legacy header with no trailing newline', async () => {
    const values = {
        ...baseValues,
        files: [csvFile(legacyHeader)],
    }

    const result = await submit(values)

    expect(uploadFile).not.toHaveBeenCalled()
    expect(result[FORM_ERROR]).toHaveLength(1)
})

it('uploads a new-format event CSV as usual', async () => {
    const values = {
        ...baseValues,
        files: [csvFile(`${newHeader}\n`)],
    }

    const result = await submit(values)

    expect(uploadFile).toHaveBeenCalledTimes(1)
    expect(result).toEqual(jobStartedMessage)
})

it('does not check the file contents for non-CSV formats', async () => {
    const values = {
        ...baseValues,
        format: 'json',
        files: [csvFile('{"events":[]}')],
    }

    const result = await submit(values)

    expect(uploadFile).toHaveBeenCalledTimes(1)
    expect(result).toEqual(jobStartedMessage)
})
