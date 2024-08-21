import { Observable, of } from 'rxjs';

export interface Data {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export const dataObj$: Observable<Data[]> = of(
  [...Array(10000).keys()].map((index) => ({
    id: index,
    firstName: `Abhinav_${index}`,
    lastName: `Dhiman_${index}`,
    age: 18 + (index % 12),
  }))
);
