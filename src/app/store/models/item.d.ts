export interface Item {
  title: string;
  description: string;
  email: string;
  image: string;
  price: number;
}

export interface ItemResults {
  items: Item[];
}
