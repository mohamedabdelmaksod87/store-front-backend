import { Request, Response } from "express";
import { OrderModel } from "../models/orders";

const order = new OrderModel();

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const info = {
      status: req.body.status,
      user_id: req.body.userInfo.id,
    };
    const result = await order.create(info);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const addProduct = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const isOrder = await order.show(req.params.id);
    if (!isOrder)
      return res
        .status(404)
        .json({ error: `order doesn't exist, can't add product` });
    if (isOrder.status !== "active") {
      return res
        .status(400)
        .json("Order is not active,product could not be added to order");
    }
    const result = await order.addProductToOrder({
      ...req.body,
      order_id: req.params.id,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const findUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await order.getUserOrders(req.body.userInfo.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

export default {
  createOrder,
  addProduct,
  findUserOrders,
};
