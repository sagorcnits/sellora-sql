import bcrypt from "bcryptjs";
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

    return existingUser;
  },
};
