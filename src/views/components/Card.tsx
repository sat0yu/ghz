import * as React from 'react';
import { Card } from '../../interfaces/card';

interface Props {
  card: Card;
}

const Card: React.FC<Props> = ({ card }) => (
  <li>
    <a href={card.url}>{card.title}</a>
  </li>
);

export default Card;
