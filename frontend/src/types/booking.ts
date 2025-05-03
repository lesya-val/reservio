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
