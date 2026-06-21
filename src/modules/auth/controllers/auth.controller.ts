import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import { sendResponse } from "../../../common/response/sendResponse";
import { authService } from "../services/auth.service";
import { RegisterRequest } from "../types/auth.type";

export const authController = {
  async registerUser(req: Request, res: Response) {
    const { name, email, password, phone, avatar } = req.body;

    const hashPassword = async (password: string) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    };

    const user: RegisterRequest = {
      name,
      email,
      password: await hashPassword(password),
      phone,
      avatar,
    };

    const result = await authService.registerUser(user);

    return sendResponse(res, 200, result, "Register successful");
  },

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await authService.loginUser({ email, password });

    if (!user) {
      return sendResponse(res, 401, null, "Invalid credentials");
    }

    return sendResponse(res, 200, user, "Login successful");
  },
};
