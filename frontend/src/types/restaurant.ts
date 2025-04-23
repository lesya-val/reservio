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