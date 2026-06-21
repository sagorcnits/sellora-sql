import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import { sendResponse } from "../../../common/response/sendResponse";
import { getUserByEmail } from "../../../utils/getUserByEmail";
import { userService } from "../../user/services/user.service";
import { authService } from "../services/auth.service";
import { RegisterRequest } from "../types/auth.type";

export const authController = {
  async registerUser(req: Request, res: Response) {
    const { name, email, password, phone, avatar } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return sendResponse(res, 200, null, "User already exists");
    }

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

  async updateProfile(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone, avatar } = req.body;

    const existingUser = await userService.getUserById(Number(id));

    if (!existingUser) {
      return sendResponse(res, 404, null, "User not found");
    }

    const user = await authService.updateProfile({
      id: Number(id),
      name,
      email,
      phone,
      avatar,
    });

    if (!user) {
      return sendResponse(
        res,
        404,
        null,
        "Something went wrong! Please try again",
      );
    }
    return sendResponse(res, 200, null, "User updated successfully");
  },

  async getProfile(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.getUserById(Number(id));

    if (!user) {
      return sendResponse(res, 404, null, "User not found");
    }

    return sendResponse(res, 200, user, "User retrieved successfully");
  },

  async changePassword(req: Request, res: Response) {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const existingUser = await userService.getUserById(Number(id));

    if (!existingUser) {
      return sendResponse(res, 404, null, "User not found");
    }

    const user = await authService.changePassword(
      {
        id: Number(id),
        oldPassword,
        newPassword,
      },

      existingUser,
    );

    if (!user) {
      return sendResponse(
        res,
        404,
        null,
        "Something went wrong! Please try again",
      );
    }

    return sendResponse(res, 200, null, "Password changed successfully");
  },
};
