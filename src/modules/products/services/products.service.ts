import db from "../../../config/database";
import { TProduct } from "../types/products.type";
// product Service
export const productService = {
  async createProduct(product: TProduct) {
    const values = [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.category_id,
    ];

    const product_image_value = product.images.map((image) => image);

    // query
    const image_query = `INSERT INTO product_images (product_id, image) VALUES (?, ?)`;

    // query
    const query = `INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)`;

    const [rows]: any = await db.execute(query, values);

    await db.execute(image_query, [rows.insertId, product_image_value]);

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
  async updateProduct(id: number, product: TProduct) {
    const values = [
      product.name,
      product.description,
      product.price,
      product.stock,
      product.category_id,
      id,
    ];

    const product_image_value = product.images.map((image) => image);

    // query
    // const image_query = `INSERT INTO product_images (product_id, image) VALUES (?, ?)`;

    // query
    const query = `UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?`;

    await db.execute(query, values);

    // await db.execute(image_query, [id, product_image_value]);

    return true;
  },

  async deleteProduct(id: number) {
    // query
    const query = `DELETE FROM products WHERE id = ?`;

    await db.execute(query, [id]);

    return true;
  },
};
