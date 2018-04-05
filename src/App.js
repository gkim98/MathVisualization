import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { addSetting } from './actions/settings';
import { setStartYear, setEndYear, setFeature } from './actions/filters';
import './App.css';

const store = configureStore();
store.dispatch(addSetting({ 
    startYear: 2006,
    endYear:  2007,
    feature: 'nope'
}));
store.dispatch(addSetting({ 
    startYear: 2008,
    endYear:  2009,
    feature: 'fish'
}));

store.dispatch(setEndYear(2017));
store.dispatch(setStartYear(2005));


const state = store.getState();
console.log(state);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
