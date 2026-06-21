import db from "../../../config/database";

export const userService = {
  async getUsers() {
    const [users] = await db.query(
      "SELECT name, email, avatar, role, status, created_at, last_login FROM users",
    );
    return users;
  },
};
