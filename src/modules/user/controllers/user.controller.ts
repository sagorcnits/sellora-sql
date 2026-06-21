import { Request, Response } from "express";
import { sendResponse } from "../../../common/sendResponse";
import { userService } from "../services/user.service";
export const userController = {
  async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();
    return sendResponse(res, 200, users, "Users retrieved successfully");
  },
};
