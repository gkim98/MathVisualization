const filterReducerDefault = {
    startYear: 0,
    endYear: 0,
    feature: ''
}

export default (state=filterReducerDefault, action) => {
    switch (action.type) {
        case 'SET_START_YEAR':
            return {
                ...state,
                startYear: action.year
            }
        case 'SET_END_YEAR':
            return {
                ...state,
                endYear: action.year
            }
        case 'SET_FEATURE':
            return {
                ...state,
                feature: action.feature
            }
        default:
            return state;
    }
}