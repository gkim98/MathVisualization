const eventsReducerDefault = {
    isDisplayed: false,
    year: 2005,
    feature: ''
}

export default (state=eventsReducerDefault, action) => {
    switch (action.type) {
        case 'CHANGE_IS_DISPLAYED':
            return {
                ...state,
                startYear: action.isDisplayed
            }
        case 'CHANGE_CHILD_YEAR':
            return {
                ...state,
                endYear: action.year
            }
        case 'CHANGE_CHILD_FEATURE':
            return {
                ...state,
                feature: action.feature
            }
        default:
            return state;
    }
}