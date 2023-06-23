export interface User {
  id: string;
  avatar?: string;
  note?: string;
  name?: string;

  [key: string]: any;
}
