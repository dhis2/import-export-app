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
