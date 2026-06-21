import db from "../../../config/database";
// product Service
export const productService = {
  async createProduct(product: any) {
    const values = [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.category_id,
    ];

    // query
    const query = `INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)`;

    const [rows] = await db.execute(query, values);

    return rows;
  },

  async getProducts(page: number, limit: number) {
    const offset = (page - 1) * limit;

    // query
    const query = `
    SELECT products.id, products.name, products.description, products.price, products.stock, categories.name as category_name, 
    products.created_at, products.updated_at FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    ORDER BY products.id DESC
    LIMIT ? offset ?`;

    const values = [limit, offset];

    const [products]: any = await db.query(query, values);
    const [total]: any = await db.query(
      `SELECT COUNT(*) as total FROM products`,
    );

    return {
      products,
      total: total[0].total,
    };
  },
  async getProductById(id: number) {
    const query = `SELECT * FROM products WHERE id = ?`;
    const [products]: any[] = await db.execute(query, [id]);
    return products[0];
  },
};
