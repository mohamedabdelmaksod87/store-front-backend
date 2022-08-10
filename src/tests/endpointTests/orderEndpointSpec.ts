import supertest from "supertest";
import app from "../..";
import { resetTable } from "../helpers/prepare";

const request = supertest(app);

describe("Test Order Endpoints responses", () => {
  let token: string;

  beforeAll(async (): Promise<void> => {
    const data: object = {
      firstname: "abc",
      lastname: "cba",
      password: "12345",
    };
    const response = await request.post("/user").send(data);
    token = response.body.token;
    await request
      .post("/product")
      .send({
        name: "milk",
        price: 5,
      })
      .set("Authorization", `Bearer ${token}`);
  });

  afterAll(async (): Promise<void> => {
    await resetTable("order_products");
    await resetTable("orders");
    await resetTable("products");
    await resetTable("users");
  });

  it("POST /order should create new order and return status code 201", async (): Promise<void> => {
    const response = await request
      .post("/order")
      .send({ status: "active" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      status: "active",
      user_id: 1,
    });
  });

  it("POST /order/:id/addproduct should add product to given order id and return status code 200", async (): Promise<void> => {
    const response = await request
      .post("/order/1/addproduct")
      .send({ quantity: 3, product_id: 1 })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      quantity: 3,
      order_id: 1,
      product_id: 1,
    });
  });

  it("GET /order/userorders should return [] of orders belong to given user id inside the token and return status code 200", async (): Promise<void> => {
    const response = await request
      .get("/order/userorders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
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
