import React, { Fragment } from 'react'

export const Form = ({ children }) => <Fragment>{children()}</Fragment>

export const useField = jest.fn((name, { value }) => ({
    input: {
        name,
        value,
        onChange: jest.fn(),
    },
    meta: {
        touched: false,
        error: '',
    },
}))

const formSpyRenderPayload = {
    values: {},
    form: { change: jest.fn() },
}
export const FormSpy = ({ render }) => (
    <Fragment>{render(formSpyRenderPayload)}</Fragment>
)
