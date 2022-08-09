import express from "express";
import orderController from "../controller/orderController";
import verifyJWT from "./../middleware/verifyJWT";

const orderRouter: express.Router = express.Router();

orderRouter.use(verifyJWT);

orderRouter.post("/", orderController.createOrder);
orderRouter.post("/:id/addproduct", orderController.addProduct);
orderRouter.get("/userorders", orderController.findUserOrders);

export default orderRouter;
