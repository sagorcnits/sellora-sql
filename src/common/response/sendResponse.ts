import { Response } from "express";

interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export const sendResponse = (
  res: Response,
  status: number,
  data: any,
  message: string,
  pagination?: Pagination,
) => {
  if (pagination) {
    res.status(status).json({
      status,
      message,
      data,
      pagination,
    });
  }

  res.status(status).json({
    status,
    message,
    data,
  });
};
