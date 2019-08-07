export const Form = ({ children }) => <Fragment>{children}</Fragment>

export const useField = jest.fn(() => ({
    input: {
        name: 'Name',
        value: '',
        onChange: jest.fn(),
    },
    meta: {
        touched: false,
        error: '',
    },
}))
