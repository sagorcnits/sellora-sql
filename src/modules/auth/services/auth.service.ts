import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../../../utils/getUserByEmail";
import authModel from "../models/auth.model";

import db from "../../../config/database";
import { TUser } from "../../user/types/user.type";
import { RegisterRequest } from "../types/auth.type";

//
export const authService = {
  async registerUser(user: RegisterRequest) {
    const result = await authModel.registerUser(user);
    return result;
  },
  async loginUser(user: { email: string; password: string }) {
    const existingUser = await getUserByEmail(user.email);

    if (!existingUser) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return null;
    }

    const jwtPayload = {
      id: existingUser.id,
      email: existingUser.email,
    };

    const accessToken = jwt.sign(jwtPayload, "secret");

    delete existingUser.password;

    return { accessToken, user: existingUser };
  },

  async updateProfile(user: TUser) {
    const updates: string[] = [];
    const values: any[] = [];

    if (user.name !== undefined) {
      updates.push("name = ?");
      values.push(user.name);
    }

    if (user.email !== undefined) {
      updates.push("email = ?");
      values.push(user.email);
    }

    if (user.phone !== undefined) {
      updates.push("phone = ?");
      values.push(user.phone);
    }

    if (user.avatar !== undefined) {
      updates.push("avatar = ?");
      values.push(user.avatar);
    }

    values.push(user.id);

    const query = `
    UPDATE users
    SET ${updates.join(", ")}
    WHERE id = ?
  `;

    const [rows] = await db.execute(query, values);

    return rows;
  },

  async changePassword(
    user: {
      id: number;
      oldPassword: string;
      newPassword: string;
    },
    existingUser: TUser,
  ) {
    const isPasswordValid = await bcrypt.compare(
      user.oldPassword,
      existingUser?.password as string,
    );

    if (!isPasswordValid) {
      return null;
    }

    const query = `UPDATE users SET password = ? WHERE id = ?`;
    const [rows] = await db.execute(query, [user.newPassword, user.id]);
    return rows;
  },
};
