export interface User {
  id?: string;
  name: string;
  surname: string;
  city: string;
  country: string;
  email: string;
  password?: string;
  role?:Role
}
export interface Role {
  admin?: boolean;
  subscribe?: boolean;
}
