import { POPULATION_DATASET_ID } from './earthEngines.js'

const populationFeatures = [
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2020',
        properties: {
            'system:time_end': 1609459200000,
            'system:time_start': 1577836800000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2019',
        properties: {
            'system:time_end': 1577836800000,
            'system:time_start': 1546300800000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2018',
        properties: {
            'system:time_end': 1546300800000,
            'system:time_start': 1514764800000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2017',
        properties: {
            'system:time_end': 1514764800000,
            'system:time_start': 1483228800000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2016',
        properties: {
            'system:time_end': 1483228800000,
            'system:time_start': 1451606400000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2015',
        properties: {
            'system:time_end': 1451606400000,
            'system:time_start': 1420070400000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2014',
        properties: {
            'system:time_end': 1420070400000,
            'system:time_start': 1388534400000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2013',
        properties: {
            'system:time_end': 1388534400000,
            'system:time_start': 1356998400000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2012',
        properties: {
            'system:time_end': 1356998400000,
            'system:time_start': 1325376000000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2011',
        properties: {
            'system:time_end': 1325376000000,
            'system:time_start': 1293840000000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2010',
        properties: {
            'system:time_end': 1293840000000,
            'system:time_start': 1262304000000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2009',
        properties: {
            'system:time_end': 1262304000000,
            'system:time_start': 1230768000000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2008',
        properties: {
            'system:time_end': 1230768000000,
            'system:time_start': 1199145600000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2007',
        properties: {
            'system:time_end': 1199145600000,
            'system:time_start': 1167609600000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2006',
        properties: {
            'system:time_end': 1167609600000,
            'system:time_start': 1136073600000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2005',
        properties: {
            'system:time_end': 1136073600000,
            'system:time_start': 1104537600000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2004',
        properties: {
            'system:time_end': 1104537600000,
            'system:time_start': 1072915200000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2003',
        properties: {
            'system:time_end': 1072915200000,
            'system:time_start': 1041379200000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2002',
        properties: {
            'system:time_end': 1041379200000,
            'system:time_start': 1009843200000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2001',
        properties: {
            'system:time_end': 1009843200000,
            'system:time_start': 978307200000,
        },
    },
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2000',
        properties: {
            'system:time_end': 978307200000,
            'system:time_start': 946684800000,
        },
    },
]

const populationAgeGroupFeatures = [
    {
        type: 'Feature',
        geometry: null,
        id: 'ABW_2020',
        properties: {
            'system:time_end': 1609372800000,
            'system:time_start': 1577836800000,
        },
    },
]

export const getMockPeriods = eeId => {
    if (eeId === POPULATION_DATASET_ID) {
        return populationFeatures
    }

    return populationAgeGroupFeatures
}
