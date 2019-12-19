import {
    LOADING_ATTRIBUTES_ERROR,
    LOADING_ATTRIBUTES_START,
    SET_ATTRIBUTES,
} from './actions'

const initialState = {
    dataElement: {
        loading: false,
        loaded: false,
        error: '',
        data: [],
    },

    organisationUnit: {
        loading: false,
        loaded: false,
        error: '',
        data: [],
    },

    category: {
        loading: false,
        loaded: false,
        error: '',
        data: [],
    },
}

export default function attributesReducer(
    state = initialState,
    { type, payload } = {}
) {
    if (type === LOADING_ATTRIBUTES_START) {
        return {
            ...state,
            [payload]: {
                ...state[payload],
                loading: true,
                loaded: false,
                error: '',
            },
        }
    }

    if (type === LOADING_ATTRIBUTES_ERROR) {
        return {
            ...state,
            [payload.type]: {
                ...state[payload.type],
                loading: false,
                error: payload.message,
            },
        }
    }

    if (type === SET_ATTRIBUTES) {
        return {
            ...state,
            [payload.type]: {
                ...state[payload.type],
                data: payload.attributes,
                loading: false,
                loaded: true,
            },
        }
    }

    return state
}
