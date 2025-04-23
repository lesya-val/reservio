export enum Role {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  RESTAURANT_ADMIN = "RESTAURANT_ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export interface User {
  id: number;
  name: string;
  surname: string;
  phone?: string;
  email: string;
  password?: string;
  role: Role;
  restaurantId: number;
  createdAt?: Date;
  updatedAt?: Date;
} 