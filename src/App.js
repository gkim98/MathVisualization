import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { addSetting } from './actions/settings';
import { setStartYear, setEndYear, setFeature } from './actions/filters';
import './App2.css';

const store = configureStore();

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
