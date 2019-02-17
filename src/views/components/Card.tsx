import * as React from 'react';
import { Card as CardInterface } from '../../interfaces/card';

interface Props {
  card: CardInterface;
}

const Card: React.FC<Props> = ({ card }) => (
  <li>
    <a href={card.url}>{card.title}</a>
  </li>
);

export default Card;
