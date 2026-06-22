import db from "../../../config/database";

export const orderService = {
  async getOrders(page: number, limit: number) {
    const offset = (page - 1) * limit;

    // query
    const query = `
    SELECT 

    users.id as user_id,
    users.name as user_name,
    users.email as user_email,
    users.phone as user_phone,

    
    products.id as product_id,
    products.name as product_name,
    products.price as product_price,
    products.description as product_description,

    orders.id as order_id,
    orders.quantity, 
    orders.subtotal, 
    orders.discount_amount, 
    orders.total_amount, 
    orders.cupon_id, 
    orders.status, 
    orders.created_at, 
    orders.updated_at 
    
FROM orders
LEFT JOIN users ON orders.user_id = users.id
LEFT JOIN products ON orders.product_id = products.id
ORDER BY orders.id DESC
LIMIT ? OFFSET ?;`;

    const values = [limit, offset];

    const [orders]: any = await db.query(query, values);
    const [total]: any = await db.query(`SELECT COUNT(*) as total FROM orders`);

    return {
      orders,
      total: total[0].total,
    };
  },
};
