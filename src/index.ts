import express from "express";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import orderRouter from "./routes/orderRoute";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.listen(port, (): void => {
  console.log(`Server Listening on Port ${port}`);
});

export default app;
