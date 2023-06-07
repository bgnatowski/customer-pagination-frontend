import {Customer} from './customer';

export interface Page {
  content: Customer[],
  pageable: {
    sort: {
      empty: boolean,
      unsorted: boolean,
      sorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    unpaged: boolean,
    paged: boolean,
  },
  last: boolean,
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    unsorted: boolean,
    sorted: boolean
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean
}
