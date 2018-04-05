import { createStore, combineReducers } from 'redux';
import settingsReducer from '../reducers/settings';
import filtersReducer from '../reducers/filters';

export default () => {
    const store = createStore(
        combineReducers({
            settings: settingsReducer,
            filters: filtersReducer
        })
    );

    return store;
}