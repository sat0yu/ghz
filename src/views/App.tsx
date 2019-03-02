import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../state/store';
import CardBrowser from './components/CardBrowser';
import ConfigurationForm from './containers/ConfigurationForm';

import './App.css';

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <ConfigurationForm />
      <CardBrowser />
    </div>
  </Provider>
);

export default App;
