import express from "express";
import productController from "../controller/productController";
import verifyJWT from "../middleware/verifyJWT";

const productRouter: express.Router = express.Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.showProduct);
productRouter.post("/", verifyJWT, productController.createProduct);

export default productRouter;
