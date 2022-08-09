import { OrderModel, Order, OrderProduct, UserOrder } from "../models/orders";
import { prepareDB, resetTable } from "./helpers/prepare";
const order = new OrderModel();

describe("Testing Order Model", (): void => {
  beforeAll(async (): Promise<void> => {
    await prepareDB();
  });

  afterAll(async (): Promise<void> => {
    await resetTable("order_products");
    await resetTable("orders");
    await resetTable("products");
    await resetTable("users");
  });

  it("should create new order and return new order record", async (): Promise<void> => {
    const data: Order = {
      status: "active",
      user_id: 1,
    };
    const result: Order = await order.create(data);
    expect(result).toEqual({
      id: 1,
      status: "active",
      user_id: 1,
    });
  });

  it("should add product to order_products table", async (): Promise<void> => {
    const data: OrderProduct = {
      quantity: 3,
      order_id: 1,
      product_id: 1,
    };
    const result: OrderProduct = await order.addProductToOrder(data);
    expect(result).toEqual({
      id: 1,
      quantity: 3,
      order_id: 1,
      product_id: 1,
    });
  });

  it("should return user orders given user id", async (): Promise<void> => {
    const result: UserOrder[] = await order.getUserOrders(1);
    expect(result).toEqual([
      {
        user_id: 1,
        order_id: 1,
        status: "active",
        quantity: 3,
        name: "milk",
        price: 5,
        product_id: 1,
      },
    ]);
  });
});
