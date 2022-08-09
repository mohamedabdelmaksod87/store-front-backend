import { Request, Response } from "express";
import { ProductModel } from "../models/product";

const product = new ProductModel();

const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await product.index();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const showProduct = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const result = await product.show(req.params.id);
    if (!result)
      return res.status(404).json({ error: `requested product doesn't exist` });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await product.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

export default {
  createProduct,
  getAllProducts,
  showProduct,
};
