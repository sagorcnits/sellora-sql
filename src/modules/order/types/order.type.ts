// Enum for order status
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// Main Order type (for selecting/reading data)
export interface Order {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  subtotal: number; // DECIMAL(10,2) -> number
  discount_amount: number | null; // DEFAULT 0, but can be null
  total_amount: number;
  cupon_id: number | null; // Can be NULL
  status: OrderStatus;
  created_at: Date | string; // Depending on how you handle dates
  updated_at: Date | string;
}

// For creating a new order (omitting auto-generated fields)
export interface CreateOrderInput {
  user_id: number;
  product_id: number;
  quantity: number;
  subtotal: number;
  discount_amount?: number; // Optional, defaults to 0
  total_amount: number;
  cupon_id?: number | null; // Optional
  status?: OrderStatus; // Optional, defaults to 'pending'
  // created_at and updated_at are auto-generated
}

// For updating an order (all fields optional except id)
export interface UpdateOrderInput {
  user_id?: number;
  product_id?: number;
  quantity?: number;
  subtotal?: number;
  discount_amount?: number | null;
  total_amount?: number;
  cupon_id?: number | null;
  status?: OrderStatus;
}

// For database operations with Prisma (if using Prisma)
// Or you can use this for raw SQL with parameterized queries
export interface OrderQueryParams {
  userId?: number;
  productId?: number;
  status?: OrderStatus;
  minTotal?: number;
  maxTotal?: number;
  startDate?: Date;
  endDate?: Date;
}
