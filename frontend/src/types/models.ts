export enum Role {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  RESTAURANT_ADMIN = "RESTAURANT_ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export const roleMap = {
  [Role.SYSTEM_ADMIN]: "Системный администратор",
  [Role.RESTAURANT_ADMIN]: "Администратор",
  [Role.EMPLOYEE]: "Сотрудник",
};

export enum BookingStatus {
  NEW = "NEW",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
}

export const statusMap = {
  [BookingStatus.NEW]: "Новая",
  [BookingStatus.CONFIRMED]: "Подтверждена",
  [BookingStatus.CANCELED]: "Отменена",
};

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
  status?: string;
  guestsCount: number;
  dateTime: string;
  name: string;
  phone: string;
  notes: string;
  hallId?: number | null;
  tableId?: number;
}
