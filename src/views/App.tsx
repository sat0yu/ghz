import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../state/store';
import CardBrowser from './containers/CardBrowser';

import logoSvg from '../assets/logo.svg';
import './App.css';

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <img src={logoSvg} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <CardBrowser />
    </div>
  </Provider>
);

export default App;
