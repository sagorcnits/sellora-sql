import { Request, Response } from "express";
import { responsePagination } from "../../../common/response/responsePagination";
import { sendResponse } from "../../../common/response/sendResponse";
import { orderModel } from "../models/order.model";
import { orderService } from "../services/order.service";
export const orderController = {
  async creteOrder(req: Request, res: Response) {
    const {
      user_id,
      product_id,
      quantity,
      subtotal,
      discount_amount,
      total_amount,
      cupon_id,
      status,
    } = req.body;

    const order = await orderModel.createOrder({
      user_id,
      product_id,
      quantity,
      subtotal,
      discount_amount,
      total_amount,
      cupon_id,
      status,
    });

    if (!order) {
      return sendResponse(
        res,
        404,
        null,
        "Something went wrong! Please try again",
      );
    }

    return sendResponse(res, 200, null, "Order created successfully");
  },

  async getOrders(req: Request, res: Response) {
    const { page, limit } = req.query;
    const { orders, total } = await orderService.getOrders(
      Number(page),
      Number(limit),
    );
    // return
    return sendResponse(
      res,
      200,
      orders,
      "Orders retrieved successfully",
      responsePagination(Number(page), Number(limit), Number(total)),
    );
  },
};
