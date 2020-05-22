export interface StorePagination<T> {
  sort?: keyof T;
  skip: number;
  top: number;
}
