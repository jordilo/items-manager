export interface StorePagination<T> {
  filter: string;
  sort?: keyof T;
  order: 'asc' | 'desc';
  skip: number;
  top: number;
}
