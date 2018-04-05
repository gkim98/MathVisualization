/*
    actions for changing the settings of the graphs
*/

export const setStartYear = (year = 2005) => ({     
    type: 'SET_START_YEAR',
    year
})

export const setEndYear = (year = 2017) => ({
    type: 'SET_END_YEAR',
    year
})

export const setFeature = (feature = '') => ({
    type: 'SET_FEATURE',
    feature
})