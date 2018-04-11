/*
    actions for storing the saved settings
*/

export const addSetting = (
    {
        startYear = 2005,
        endYear = 2017,
        feature = ''
    } = {}
) => ({
    type: 'ADD_SETTING',
    setting: {
        startYear,
        endYear,
        feature
    }
})

// add getSettings
