import db from "../../../config/database";

export const userService = {
  async getUsers(page: number, limit: number) {
    const offset = (page - 1) * limit;

    // query
    const query = `SELECT name, email, avatar, role, status, created_at, last_login FROM users 
      ORDER BY id DESC
      LIMIT ? offset ?`;
    const values = [limit, offset];

    const [users]: any = await db.query(query, values);
    const total = await db.query(`SELECT COUNT(*) as total FROM users`);
    return {
      users,
      total,
    };
  },
};
