import express from "express";
import userController from "../controller/userController";
import verifyJWT from "./../middleware/verifyJWT";

const userRouter: express.Router = express.Router();

userRouter.get("/", verifyJWT, userController.fetchAllUsers);
userRouter.get("/:id", verifyJWT, userController.fetchUser);
userRouter.post("/", userController.createUser);

export default userRouter;
