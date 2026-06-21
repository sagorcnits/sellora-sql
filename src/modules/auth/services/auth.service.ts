import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../../../utils/getUserByEmail";
import authModel from "../models/auth.model";
export const authService = {
  async registerUser(user: any) {
    const result = await authModel.registerUser(user);
    return result;
  },
  async loginUser(user: any) {
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
};
