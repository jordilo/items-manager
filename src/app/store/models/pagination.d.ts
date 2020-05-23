export interface StorePagination<T> {
  filter: string;
  sort?: SortableFieds<T>;
  order: 'asc' | 'desc';
  skip: number;
  top: number;
}

type SortableFieds<T> = keyof T | '';
