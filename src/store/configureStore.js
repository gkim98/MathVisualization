import { createStore, combineReducers } from 'redux';
import settingsReducer from '../reducers/settings';
import filtersReducer from '../reducers/filters';
import eventsReducer from '../reducers/events';

export default () => {
    const store = createStore(
        combineReducers({
            settings: settingsReducer,
            filters: filtersReducer,
            events: eventsReducer
        })
    );

    return store;
}