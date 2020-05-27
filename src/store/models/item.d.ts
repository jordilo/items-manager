export interface Item {
  title: string;
  description: string;
  email: string;
  image: string;
  price: string;
  isFav?: boolean;
}

export interface ItemResults {
  items: Item[];
}
