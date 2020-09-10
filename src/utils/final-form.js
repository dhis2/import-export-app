import i18n from '@dhis2/d2-i18n'

export const FORM_ERROR = 'FINAL_FORM/form-error'
export const ARRAY_ERROR = 'FINAL_FORM/array-error'

export const jobStartedMessage = {
    [FORM_ERROR]: [
        {
            id: `job-started`,
            info: true,
            message: i18n.t('Job started.'),
        },
    ],
}
