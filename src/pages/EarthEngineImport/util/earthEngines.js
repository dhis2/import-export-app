import i18n from '@dhis2/d2-i18n'

export const POPULATION_AGE_GROUPS_DATASET_ID =
    'WorldPop/GP/100m/pop_age_sex_cons_unadj'

export const POPULATION_DATASET_ID = 'WorldPop/GP/100m/pop'

export const earthEngines = {
    [POPULATION_DATASET_ID]: {
        datasetId: POPULATION_DATASET_ID,
        name: i18n.t('Population'),
        source: 'WorldPop / Google Earth Engine',
        sourceUrl:
            'https://developers.google.com/earth-engine/datasets/catalog/WorldPop_GP_100m_pop',
        img: 'images/population.png',
        defaultAggregations: ['sum', 'mean'],
        periodType: 'Yearly',
        bandReducer: 'sum',
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
    [POPULATION_AGE_GROUPS_DATASET_ID]: {
        datasetId: POPULATION_AGE_GROUPS_DATASET_ID,
        name: i18n.t('Population age groups'),
        source: 'WorldPop / Google Earth Engine',
        sourceUrl:
            'https://developers.google.com/earth-engine/datasets/catalog/WorldPop_GP_100m_pop_age_sex_cons_unadj',
        img: 'images/population.png',
        periodType: 'Yearly',
        bandReducer: 'sum',
        defaultAggregations: ['sum', 'mean'],
        bands: [
            {
                id: 'M_0',
                name: i18n.t('Men 0 - 1 years'),
            },
            {
                id: 'M_1',
                name: i18n.t('Men 1 - 4 years'),
            },
            {
                id: 'M_5',
                name: i18n.t('Men 5 - 9 years'),
            },
            {
                id: 'M_10',
                name: i18n.t('Men 10 - 14 years'),
            },
            {
                id: 'M_15',
                name: i18n.t('Men 15 - 19 years'),
            },
            {
                id: 'M_20',
                name: i18n.t('Men 20 - 24 years'),
            },
            {
                id: 'M_25',
                name: i18n.t('Men 25 - 29 years'),
            },
            {
                id: 'M_30',
                name: i18n.t('Men 30 - 34 years'),
            },
            {
                id: 'M_35',
                name: i18n.t('Men 35 - 39 years'),
            },
            {
                id: 'M_40',
                name: i18n.t('Men 40 - 44 years'),
            },
            {
                id: 'M_45',
                name: i18n.t('Men 45 - 49 years'),
            },
            {
                id: 'M_50',
                name: i18n.t('Men 50 - 54 years'),
            },
            {
                id: 'M_55',
                name: i18n.t('Men 55 - 59 years'),
            },
            {
                id: 'M_60',
                name: i18n.t('Men 60 - 64 years'),
            },
            {
                id: 'M_65',
                name: i18n.t('Men 65 - 69 years'),
            },
            {
                id: 'M_70',
                name: i18n.t('Men 70 - 74 years'),
            },
            {
                id: 'M_75',
                name: i18n.t('Men 75 - 79 years'),
            },
            {
                id: 'M_80',
                name: i18n.t('Men 80 years and above'),
            },
            {
                id: 'F_0',
                name: i18n.t('Women 0 - 1 years'),
            },
            {
                id: 'F_1',
                name: i18n.t('Women 1 - 4 years'),
            },
            {
                id: 'F_5',
                name: i18n.t('Women 5 - 9 years'),
            },
            {
                id: 'F_10',
                name: i18n.t('Women 10 - 14 years'),
            },
            {
                id: 'F_15',
                name: i18n.t('Women 15 - 19 years'),
            },
            {
                id: 'F_20',
                name: i18n.t('Women 20 - 24 years'),
            },
            {
                id: 'F_25',
                name: i18n.t('Women 25 - 29 years'),
            },
            {
                id: 'F_30',
                name: i18n.t('Women 30 - 34 years'),
            },
            {
                id: 'F_35',
                name: i18n.t('Women 35 - 39 years'),
            },
            {
                id: 'F_40',
                name: i18n.t('Women 40 - 44 years'),
            },
            {
                id: 'F_45',
                name: i18n.t('Women 45 - 49 years'),
            },
            {
                id: 'F_50',
                name: i18n.t('Women 50 - 54 years'),
            },
            {
                id: 'F_55',
                name: i18n.t('Women 55 - 59 years'),
            },
            {
                id: 'F_60',
                name: i18n.t('Women 60 - 64 years'),
            },
            {
                id: 'F_65',
                name: i18n.t('Women 65 - 69 years'),
            },
            {
                id: 'F_70',
                name: i18n.t('Women 70 - 74 years'),
                multiple: true,
            },
            {
                id: 'F_75',
                name: i18n.t('Women 75 - 79 years'),
            },
            {
                id: 'F_80',
                name: i18n.t('Women 80 years and above'),
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
    earthEngines[eeId].bands || NO_BANDS

export const getDefaultAggregation = (eeId) =>
    earthEngines[eeId].defaultAggregations[0]
