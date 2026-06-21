import { Response } from "express";

export const sendResponse = (
  res: Response,
  status: number,
  data: any,
  message: string,
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};
