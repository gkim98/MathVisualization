const savedSettingsDefaultState = [];

const savedSettingsReducer = (state = savedSettingsDefaultState, action) => {
    switch (action.type) {
        case 'ADD_SETTING':
            return [...state, action.setting]
        default:
            return state;
    }
}

export default savedSettingsReducer;