import * as React from 'react';
import CardBoard from '../containers/CardBoard';
import QueryForm from '../containers/QueryForm';

const CardBrowser: React.FC = () => (
  <>
    <QueryForm />
    <CardBoard />
  </>
);
export default CardBrowser;
