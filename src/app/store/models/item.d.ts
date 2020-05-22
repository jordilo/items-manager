export interface Item {
  title: string;
  description: string;
  email: string;
  image: string;
  price: string;
}

export interface ItemResults {
  items: Item[];
}
