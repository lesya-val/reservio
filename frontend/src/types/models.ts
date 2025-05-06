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

export interface Restaurant {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email?: string | null;
  adminId?: number | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Hall {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  restaurantId: number;
  tables?: Table[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Table {
  id: number;
  number: number;
  capacity: number;
  x: number;
  y: number;
  width: number;
  height: number;
  hallId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  date: Date;
  guestsCount: number;
  tableNumber: number;
  notes?: string;
  restaurantId: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
