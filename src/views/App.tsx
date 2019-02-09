import * as React from 'react';
import CardBrowser from './containers/CardBrowser';

import logoSvg from '../assets/logo.svg';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoSvg} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <CardBrowser />
      </div>
    );
  }
}

export default App;
