import * as React from 'react';
import CardBoard from '../containers/CardBoard';
import QueryForm from '../containers/QueryForm';

import logoSvg from '../../assets/logo.svg';

const CardBrowser: React.FC = () => (
  <>
    <header className="App-header">
      <img src={logoSvg} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <QueryForm />
    <CardBoard />
  </>
);
export default CardBrowser;
