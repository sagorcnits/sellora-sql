import { Response } from "express";

interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export const sendResponse = <T>(
  res: Response,
  status: number,
  data: T,
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
