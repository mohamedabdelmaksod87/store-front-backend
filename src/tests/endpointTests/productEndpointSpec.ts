import supertest from "supertest";
import app from "../..";
import { resetTable } from "../helpers/prepare";
import { Product } from "../../models/product";

const request = supertest(app);

describe("Test Product Endpoints responses", () => {
  let token: string;

  beforeAll(async (): Promise<void> => {
    const data: object = {
      firstname: "abc",
      lastname: "cba",
      password: "12345",
    };
    const response = await request.post("/user").send(data);
    token = response.body.token;
  });

  afterAll(async (): Promise<void> => {
    await resetTable("users");
    await resetTable("products");
  });

  it("POST /product should create new product and return status code 201", async (): Promise<void> => {
    const data: Product = {
      name: "milk",
      price: 5,
    };
    const response = await request
      .post("/product")
      .send(data)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "milk",
      price: 5,
    });
  });

  it("GET /product should return [] of products and return status code 200", async (): Promise<void> => {
    const response = await request.get("/product");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "milk",
        price: 5,
      },
    ]);
  });

  it("GET /product/:id should return product of given id and return status code 200", async (): Promise<void> => {
    const response = await request.get("/product/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "milk",
      price: 5,
    });
  });
});
