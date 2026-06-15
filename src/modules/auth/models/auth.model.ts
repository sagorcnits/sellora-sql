import db from "../../../config/database";
import { RegisterRequest } from "../types/auth.type";

const authModel = {
  registerUser: async (user: RegisterRequest) => {
    const values = [
      user.name,
      user.email,
      user.password,
      user.phone,
      user.avatar,
    ];

    // query
    const query = `INSERT INTO users (name, email, password, phone, avatar) VALUES (?, ?, ?, ?, ?)`;

    const [rows] = await db.execute(query, values);

    return rows;
  },
};

export default authModel;
