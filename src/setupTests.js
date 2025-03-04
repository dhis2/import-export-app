import '@testing-library/jest-dom'

// These modules are unfortunately pulled in on nearly all
// of the component tests.

// @dhis2/analytics needs to be mocked because of the error
// "Cannot read properties of undefined (reading 'prototype')"
// This error originates from a line in this module:
// node_modules/mathjs/lib/cjs/type/complex/Complex.js
// _complex["default"].prototype.type = 'Complex';

jest.mock('@dhis2/analytics', () => ({
    apiFetchOrganisationUnitLevels: jest.fn(),
    ouIdHelper: {},
    DIMENSION_ID_ORGUNIT: 'ou',
}))

// @dhis2/maps-gl needs to be mocked because jest-dom
// does not implement window.URL.createObjectURL
// in module: node_modules/maplibre-gl/dist/maplibre-gl.js
jest.mock('@dhis2/maps-gl', () => ({
    loadEarthEngineWorker: jest.fn(),
}))
