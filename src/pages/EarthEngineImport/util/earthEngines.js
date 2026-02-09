import i18n from '@dhis2/d2-i18n'

const POPULATION_TOTAL_EE_ID_GLOBAL2 =
    'projects/sat-io/open-datasets/WORLDPOP/pop'
const POPULATION_AGE_GROUPS_EE_ID_GLOBAL2 =
    'projects/wpgp-global2/assets/agesex_100m'
const SOURCE_NAME = 'WorldPop / Google Earth Engine'
export const SOURCE_URL = 'https://gee-community-catalog.org/projects/worldpop'

export const earthEngines = {
    [POPULATION_TOTAL_EE_ID_GLOBAL2]: {
        earthEngineId: POPULATION_TOTAL_EE_ID_GLOBAL2,
        datasetId: POPULATION_TOTAL_EE_ID_GLOBAL2,
        name: i18n.t('Population WorldPop Global2'),
        source: SOURCE_NAME,
        sourceUrl: SOURCE_URL,
        img: 'images/population.png',
        defaultAggregations: ['sum', 'mean'],
        periodType: 'Yearly',
        bandReducer: 'sum',
        band: 'population',
        filters: ({ id, name, year }) => [
            {
                id,
                name,
                type: 'eq',
                arguments: ['year', String(year)],
            },
        ],
        mosaic: true,
        params: {
            min: 0,
            max: 25,
            palette: '#fee5d9,#fcbba1,#fc9272,#fb6a4a,#de2d26,#a50f15', // Reds
        },
    },
    [POPULATION_AGE_GROUPS_EE_ID_GLOBAL2]: {
        earthEngineId: POPULATION_AGE_GROUPS_EE_ID_GLOBAL2,
        datasetId: POPULATION_AGE_GROUPS_EE_ID_GLOBAL2,
        name: i18n.t('Population age groups WorldPop Global2'),
        source: SOURCE_NAME,
        sourceUrl: SOURCE_URL,
        img: 'images/population.png',
        periodType: 'Yearly',
        bandReducer: 'sum',
        defaultAggregations: ['sum', 'mean'],
        bands: [
            {
                id: 'm_00',
                name: i18n.t('Men 0 - 1 years'),
            },
            {
                id: 'm_01',
                name: i18n.t('Men 1 - 4 years'),
            },
            {
                id: 'm_05',
                name: i18n.t('Men 5 - 9 years'),
            },
            {
                id: 'm_10',
                name: i18n.t('Men 10 - 14 years'),
            },
            {
                id: 'm_15',
                name: i18n.t('Men 15 - 19 years'),
            },
            {
                id: 'm_20',
                name: i18n.t('Men 20 - 24 years'),
            },
            {
                id: 'm_25',
                name: i18n.t('Men 25 - 29 years'),
            },
            {
                id: 'm_30',
                name: i18n.t('Men 30 - 34 years'),
            },
            {
                id: 'm_35',
                name: i18n.t('Men 35 - 39 years'),
            },
            {
                id: 'm_40',
                name: i18n.t('Men 40 - 44 years'),
            },
            {
                id: 'm_45',
                name: i18n.t('Men 45 - 49 years'),
            },
            {
                id: 'm_50',
                name: i18n.t('Men 50 - 54 years'),
            },
            {
                id: 'm_55',
                name: i18n.t('Men 55 - 59 years'),
            },
            {
                id: 'm_60',
                name: i18n.t('Men 60 - 64 years'),
            },
            {
                id: 'm_65',
                name: i18n.t('Men 65 - 69 years'),
            },
            {
                id: 'm_70',
                name: i18n.t('Men 70 - 74 years'),
            },
            {
                id: 'm_75',
                name: i18n.t('Men 75 - 79 years'),
            },
            {
                id: 'm_80',
                name: i18n.t('Men 80 - 84 years'),
            },
            {
                id: 'm_85',
                name: i18n.t('Men 85 - 89 years'),
            },
            {
                id: 'm_90',
                name: i18n.t('Men 90 years and above'),
            },
            {
                id: 'f_00',
                name: i18n.t('Women 0 - 1 years'),
            },
            {
                id: 'f_01',
                name: i18n.t('Women 1 - 4 years'),
            },
            {
                id: 'f_05',
                name: i18n.t('Women 5 - 9 years'),
            },
            {
                id: 'f_10',
                name: i18n.t('Women 10 - 14 years'),
            },
            {
                id: 'f_15',
                name: i18n.t('Women 15 - 19 years'),
            },
            {
                id: 'f_20',
                name: i18n.t('Women 20 - 24 years'),
            },
            {
                id: 'f_25',
                name: i18n.t('Women 25 - 29 years'),
            },
            {
                id: 'f_30',
                name: i18n.t('Women 30 - 34 years'),
            },
            {
                id: 'f_35',
                name: i18n.t('Women 35 - 39 years'),
            },
            {
                id: 'f_40',
                name: i18n.t('Women 40 - 44 years'),
            },
            {
                id: 'f_45',
                name: i18n.t('Women 45 - 49 years'),
            },
            {
                id: 'f_50',
                name: i18n.t('Women 50 - 54 years'),
            },
            {
                id: 'f_55',
                name: i18n.t('Women 55 - 59 years'),
            },
            {
                id: 'f_60',
                name: i18n.t('Women 60 - 64 years'),
            },
            {
                id: 'f_65',
                name: i18n.t('Women 65 - 69 years'),
            },
            {
                id: 'f_70',
                name: i18n.t('Women 70 - 74 years'),
                multiple: true,
            },
            {
                id: 'f_75',
                name: i18n.t('Women 75 - 79 years'),
            },
            {
                id: 'f_80',
                name: i18n.t('Women 80 - 84 years'),
            },
            {
                id: 'f_85',
                name: i18n.t('Women 85 - 89 years'),
            },
            {
                id: 'f_90',
                name: i18n.t('Women 90 years and above'),
            },
        ],
        filters: ({ id, name, year }) => [
            {
                id,
                name,
                type: 'eq',
                arguments: ['year', year],
            },
        ],
        mosaic: true,
        params: {
            min: 0,
            max: 10,
            palette: '#fee5d9,#fcbba1,#fc9272,#fb6a4a,#de2d26,#a50f15', // Reds
        },
    },
}

const NO_BANDS = []

export const getEarthEngineBands = (eeId) =>
    earthEngines[eeId]?.bands || NO_BANDS

export const getDefaultAggregation = (eeId) =>
    earthEngines[eeId].defaultAggregations[0]
