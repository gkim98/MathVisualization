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
                isDisplayed: action.isDisplayed
            }
        case 'CHANGE_CHILD_YEAR':
            return {
                ...state,
                year: action.year
            }
        case 'CHANGE_CHILD_FEATURE':
            return {
                ...state,
                feature: action.feature
            }
        case 'CHANGE_CHILD_ASPECT':
            return {
                ...state,
                aspect: action.aspect
            }
        default:
            return state;
    }
}