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
};
