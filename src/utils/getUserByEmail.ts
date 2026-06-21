import db from "../config/database";

export const getUserByEmail = async (email: string) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows]: any[] = await db.execute(query, [email]);
  return rows[0];
};
