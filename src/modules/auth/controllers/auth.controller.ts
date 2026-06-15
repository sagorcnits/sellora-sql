import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import authModel from "../models/auth.model";
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

    const result = await authModel.registerUser(user);

    res.status(200).json(result);
  },
};
