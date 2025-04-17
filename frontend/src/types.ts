export interface TableColumn {
  id: string;
  name?: string;
  rules?: string;
  style?: { width: string };
}

export interface Restaurant {
  id?: number;
  name: string;
  address: string;
  phone: string;
  email?: string | null;
  workingHours?: string | null;
  adminId?: number | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  phone?: string;
  email: string;
  password?: string;
  role: string;
  restaurantId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
