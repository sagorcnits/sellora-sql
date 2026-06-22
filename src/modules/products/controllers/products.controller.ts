import { Request, Response } from "express";
import { responsePagination } from "../../../common/response/responsePagination";
import { sendResponse } from "../../../common/response/sendResponse";
import { productService } from "../services/products.service";

export const productsController = {
  async createProduct(req: Request, res: Response) {
    const { name, description, price, stock, category_id, images } = req.body;

    const product = await productService.createProduct({
      name,
      description,
      price,
      stock,
      category_id,
      images,
    });

    if (!product) {
      return sendResponse(
        res,
        404,
        null,
        "Something went wrong! Please try again",
      );
    }

    return sendResponse(res, 200, product, "Product created successfully");
  },

  async getProducts(req: Request, res: Response) {
    const { page, limit } = req.query;
    const { products, total } = await productService.getProducts(
      Number(page),
      Number(limit),
    );
    // return
    return sendResponse(
      res,
      200,
      products,
      "Products retrieved successfully",
      responsePagination(Number(page), Number(limit), Number(total)),
    );
  },

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;

    const product = await productService.getProductById(Number(id));

    if (!product) {
      return sendResponse(res, 404, null, "Product not found");
    }

    return sendResponse(res, 200, product, "Product retrieved successfully");
  },
  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, price, stock, category_id, images } = req.body;

    const product = await productService.updateProduct(Number(id), {
      name,
      description,
      price,
      stock,
      category_id,
      images,
    });

    if (!product) {
      return sendResponse(
        res,
        404,
        null,
        "Something went wrong! Please try again",
      );
    }

    return sendResponse(res, 200, product, "Product updated successfully");
  },

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    const product = await productService.deleteProduct(Number(id));

    if (!product) {
      return sendResponse(
        res,
        404,
        null,
        "Something went wrong! Please try again",
      );
    }

    return sendResponse(res, 200, product, "Product deleted successfully");
  },
};
