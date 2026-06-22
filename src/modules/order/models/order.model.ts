import db from "../../../config/database";
import { CreateOrderInput } from "../types/order.type";
export const orderModel = {
  async createOrder(order: CreateOrderInput) {
    const query = `INSERT INTO orders 
    (user_id, product_id, quantity, subtotal, discount_amount, total_amount, cupon_id, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      order.user_id,
      order.product_id,
      order.quantity,
      order.subtotal,
      order.discount_amount,
      order.total_amount,
      order.cupon_id,
      order.status,
    ];

    // cast values to any to satisfy db.execute overloads when some fields may be undefined
    return await db.execute(query, values as any);
  },
};
