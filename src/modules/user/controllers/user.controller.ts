import { Request, Response } from "express";
import { responsePagination } from "../../../common/response/responsePagination";
import { sendResponse } from "../../../common/response/sendResponse";
import { userService } from "../services/user.service";
export const userController = {
  async getUsers(req: Request, res: Response) {
    const { page, limit } = req.query;
    const { users, total } = await userService.getUsers(
      Number(page),
      Number(limit),
    );
    // return
    return sendResponse(
      res,
      200,
      users,
      "Users retrieved successfully",
      responsePagination(Number(page), Number(limit), Number(total)),
    );
  },

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userService.getUserById(Number(id));

    if (!user) {
      return sendResponse(res, 404, null, "User not found");
    }

    return sendResponse(res, 200, user, "User retrieved successfully");
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    if (!user) {
      return sendResponse(res, 404, null, "User not found");
    }

    await userService.deleteUser(Number(id));

    return sendResponse(res, 200, null, "User deleted successfully");
  },
};
