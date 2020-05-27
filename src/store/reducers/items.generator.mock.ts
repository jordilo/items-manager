import * as _ from 'lodash';
import { Item } from '../models/item';

export const itemsGenerator = (itemsNumber: number) => _.clone([...Array(itemsNumber).keys()].map((position) => {
  const finalPosition = `${position + 1}`;
  return {
    title: 'title' + finalPosition,
    description: 'description' + finalPosition,
    email: (finalPosition) + 'email@email.com',
    image: 'image' + finalPosition,
    price: finalPosition + 'price',
    isFav: false
  } as Item;
}));
