export interface DataRow {
  _id: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  name: Name;
  company: string;
  email: string;
  address: string;
  tags: string[];
  favoriteFruit: string;
}

interface Name {
  first: string;
  last: string;
}
